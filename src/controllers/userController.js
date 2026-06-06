const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../data/users');

const signup = async (req, res) => {
    try {

        const { name, email, password, preferences } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = users.find(
            user => user.email === email
        );

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            id: users.length + 1,
            name,
            email,
            password: hashedPassword,
            preferences: preferences || []
        };

        users.push(newUser);

        res.status(200).json({
            message: 'User registered successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = users.find(
            user => user.email === email
        );

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            token
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

const getPreferences = (req, res) => {

    const user = users.find(
        user => user.id === req.user.id
    );

    res.status(200).json({
        preferences: user.preferences
    });
};

const updatePreferences = (req, res) => {

    const { preferences } = req.body;

    const user = users.find(
        user => user.id === req.user.id
    );

    user.preferences = preferences;

    res.status(200).json({
        message: 'Preferences updated'
    });
};

module.exports = {
    signup,
    login,
    getPreferences,
    updatePreferences
};
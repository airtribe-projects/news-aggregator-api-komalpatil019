const users = require('../data/users');
const { fetchNews } = require('../utils/newsService');

const getNews = async (req, res) => {

    try {

        const user = users.find(
            user => user.id === req.user.id
        );

        const news = await fetchNews(user.preferences);

        res.status(200).json({
            news
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    getNews
};
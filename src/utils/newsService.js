const axios = require('axios');

const fetchNews = async (preferences = []) => {

    try {

        return [
            {
                title: 'Marvel Movie Released',
                category: 'movies'
            },
            {
                title: 'New Comic Launch',
                category: 'comics'
            },
            {
                title: 'Latest Gaming Update',
                category: 'games'
            }
        ];

    } catch (error) {
        return [];
    }
};

module.exports = {
    fetchNews
};
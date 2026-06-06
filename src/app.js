require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');

app.use('/users', userRoutes);
app.use('/news', newsRoutes);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
}

module.exports = app;
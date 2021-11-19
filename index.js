const express = require('express');

require('express-async-errors');

const { postsRouter } = require('./controllers/posts');
const app = express();


require('dotenv').config();
require('./db');

const { PORT } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/posts', postsRouter);

//error
app.use((err, req, res, next) => {
    res.json({error: err.message});
});

// Correr el servidor con el puerto.
app.listen(PORT, err => {
    if(err) return console.error(err);

    console.log(`App listening on port ${PORT}`);
});
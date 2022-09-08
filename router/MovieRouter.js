const express = require('express');
const router = express.Router();

const Movie = require('../model/Movies')

function isJsonData(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        return next(new Error("Route only accepts JSON data."));
    }
    next();
}


//All movies
router.get('/movie', async (request, response) => {
    try {
        const movie = await Movie.find();
        response.send(movie);
    } catch {
        response.status(404);
        response.send({ error: 'movie does not exist' })
    }
});


//Movie by id
router.get('/movie/:id', async (request, response) => {
    try {
        const movie = await Movie.findById(request.params.id);
        response.send(movie);
    } catch {
        response.status(404);
        response.send({ error: 'movie does not exist' })
    }
});

//Movie by release of film
router.get('/movie/byrelease/:released', async (request, response) => {
    try {
        const movie = await Movie.find({ released: { $eq: request.params.released } })
        response.send(movie);
    } catch {
        response.status(404);
        response.send({ error: 'no movies' })
    }
});


//Create a movie
router.post('/movie', async (request, response) => {
    const movie = new Movie(request.body);
    await movie.save();
    response.send(movie);
});

//Update a movie
router.put('/movie/:id', async (request, response) => {
    try {
        const movie = await Movie.updateOne({id: request.params.id}, request.body)
        await movie.save();
        response.send(movie);
    } catch {
        response.status(404);
        response.send({ error: 'movie does not exist' })
    }
});

//Delete a movie
router.delete('/movie/:id', async (request, response) => {
    try {
        const movie = await Movie.findById(request.params.id);
        await movie.deleteOne();
        response.send(movie);
    } catch {
        response.status(404);
        response.send({ error: 'movie does not exist' })
    }
});


//Search for Movies
router.get('/movie/search', async (request, response) => {
    const { s } = request.query;

    const movie = await Movie.find({ $text: { $search: s } })

    response.send(movie);
})

module.exports = router;
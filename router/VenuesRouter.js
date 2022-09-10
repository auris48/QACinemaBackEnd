const express = require('express');
const router = express.Router();

const Venue = require ('../model/Venues');

function isJsonData(request, response, next) {
    if (request.headers['content-type'] === 'application/json') {
        return next(new Error("Route only accepts JSON data"));
    }
    next();
}

//Get all Venues
router.get('/venue', async (request, response) => {
    try {
        const venue = await Venue.find();
        response.send(venue);
    } catch {
        response.status(400);
        response.send({error: "Could not retrieve venue"})
    }
});

//Search by ID
router.get('/venue/:id', async (request, response) => {
    try {
        const venue = await venue.findById(request.params.id);
        response.send(venue);
    } catch {
        response.status(404);
        response.send({ error: "Could not retrieve venue" })
    }
});

//Create
router.post('/venue', async (request, response) => {
    const venue = new Venue(request.body);
    await venue.save();
    response.send(venue);
});

//Update
router.put('/venue/:id', async (request, response) => {
    try {
        const venue = await Venue.findByIdAndUpdate(request.params.id, request.body);
        await venue.save();
        response.send(venue);
    } catch {
        response.status(404);
        response.send({ error: "Could not update venue" })
    }
});

//Delete
router.delete('/venue/:id', async (request, response) => {
    try {
        await Venue.findByIdAndDelete(request.params.id);
        response.status(204);
        response.send();
    } catch {
        response.status(404);
        response.send({ error: "Could not delete venue" })
    }
});

//Search for Venues
router.get('/venue/search', async (request, response) => {
    const { s } = request.query;
    const venue = await Venue.find({ $text: { $search: s } });
    response.send(venue);
});

module.exports = router;

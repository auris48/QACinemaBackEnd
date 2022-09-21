const express = require('express');

const router = express.Router();

const Booking = require('../model/Booking');

//creating movies using form


router.post('/booking', async (req, res) => {

    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send(booking);
    } catch {
        res.status(404).send({ error: 'The request could not be completed' });
    }
});


//retriving all the booking


router.get('/booking', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({
                path: 'movieID',
                select: 'title imageURL'
            });
        res.status(201).send(bookings);
    } catch {
        res.status(404).send({ error: 'There are no available booking' });
    }
});



//updateing booking by the id

router.put('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        Object.assign(booking, req.body);
        await booking.save();
        res.status(201)
            .send(booking);
    } catch {
        res.status(404).send({ error: 'The booking could not be changed' });
    }
});

// deleting bookings
router.delete('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        // const payment = await Payment.findById(booking.paymentID);
        // await payment.deleteOne();

        await booking.deleteOne();
        res.status(201).send(booking);
    } catch {
        res.status(404).send({ error: 'The booking could not be deleted' });
    }
});

//geting booking by the name
router.get('/booking/name/:name', async (req, res) => {
    try {
        const booking = await Booking.find({ name: { $eq: req.params.name } })
            .populate({
                path: 'movieID',
                select: 'title imageURL dateTime'
            });
        res.status(201).send(booking);
    } catch {
        res.status(404).send({ error: 'No bookings' });
    }
});


module.exports = router;
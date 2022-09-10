const express = require('express');
const User = require('../model/User');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const router = express.Router();
path = require('path');


router.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname + '/../' + 'public/login.html'));
});

router.get('/users', async (request, response) =>{
    const user = await User.find();
    response.send(user);
})

router.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname + '/../' + 'public/register.html'));
});

router.post('/login', passport.authenticate('local', {
    failureMessage: 'Invalid login credentials.',
    failureRedirect: '/'
}), (request, response) => {
    // upon successful login, passport will automatically create an express session for us to use
    response.status(200).send(request.user.username);
});

router.post('/register', async (request, response) => {
    try {
        // register the user
        const user = await User.register(new User({
            username: request.body.username,
            dateOfBirth: request.body.dateOfBirth,
            email: request.body.email,
            isAdmin: request.body.isAdmin
        }), request.body.password); // register(userWithUsername, password)

        if (user) {
            passport.authenticate("local");
            // await User.findOneAndUpdate({'username': 'rossmorr8'}, {$set: {'age':"test2"}});
            return response.status(200).send(user);
        }
    } catch (error) {
        console.error(error);
    }
    response.status(400).send('Something went wrong registering the user...');
}); 

router.get('/logout', (request, response) => {
    request.logout((error) => {
        if (error) return next(error);
        response.cookie('connect.sid', "", {
            httpOnly: true,
            path: '/',
            domain: 'localhost',
            expires: new Date(1)
        });
        response.redirect('/login');
    });
})

router.get('/protected', isAuthenticated, (request, response) => {
    // if you are authenticated, remember that you can get the user from request.user
    return response.status(200).send("Hit route only members can see.");
});

function isAuthenticated(request, response, next) {
    // passport puts an isAuthenticated() method on the request object
    // - we can use this to check if a user is logged in or not
    if (request.isAuthenticated()) return next();
    response.redirect("/login");
    // return response.status(400).send('Not logged in.');
}






module.exports = router;
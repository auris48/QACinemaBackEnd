const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { default: mongoose } = require('mongoose');
const User = require('./model/User');
const BookingRouter = require('./router/BookingRouter')
const app = express();

// Configure sessions to be used (using in-memory store, not for production)
app.use(expressSession({
    secret: "joiahjiufuioahefua", // used for encrypting the cookie, do not store in code and do not make publicly available
    resave: false,
    saveUninitialized: false, // only want sessions upon logging in
    cookie: {
        maxAge: 1 * 60 * 1000 // 1 hour cookie
    }
}));

// Passport configuration (authentication)
// - when logged in, the users id is stored in request.session.passport.user on each request
// - to make it easier to identify that a user is authenticated, we can use special methods provided by passport and passport-local-mongoose
//   to automatically find the user in the db from the id and put them on the request object as request.user
passport.serializeUser(User.serializeUser()); // User.serialize... and User.deserialize.... both come from passport-local-mongoose
passport.deserializeUser(User.deserializeUser());

// provide an authentication strategy to Passport
passport.use(new LocalStrategy(User.authenticate())); // User.authenticate() comes from passport-local-mongoose

/*
    A LocalStrategy(cb) accepts a callback of the form:

    (username, password, done) => { 
        // find user in database
        const user = User.find({ "username": username });
        // compare passwords
        // if passwords are the same: authenticate user
        // else redirect back to login page
    }
*/

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",BookingRouter); 

// initialise passport and indicate it should use sessions for logins
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (request, response) => {
    response.sendFile(__dirname + '/public/login.html');
});

app.get('/register', (request, response) => {
    response.sendFile(__dirname + '/public/register.html');
});

app.post('/login', passport.authenticate('local', {
    failureMessage: 'Invalid login credentials.',
    failureRedirect: '/'
}), (request, response) => {
    // upon successful login, passport will automatically create an express session for us to use
    response.status(200).send(request.user.username);
});

app.post('/register', async (request, response) => {
    try {
        // register the user
        const user = await User.register(new User({
            username: request.body.username
        }), request.body.password); // register(userWithUsername, password)

        if (user) {
            passport.authenticate("local");
            return response.status(200).send();
        }
    } catch (error) {
        console.error(error);
    }
    response.status(400).send('Something went wrong registering the user...');
});

app.get('/logout', (request, response) => {
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

app.get('/protected', isAuthenticated, (request, response) => {
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

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1/qa_cinema");

        app.listen(3000, () => console.log(`Server upon on port ${3000}`));
    } catch (error) {
        console.error(error);
    }
}

main();
const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { default: mongoose } = require('mongoose');
const User = require('./model/User');

const PostRouter = require('./router/PostRouter');
const BookingRouter = require('./router/BookingRouter')
const MovieRouter = require('./router/MovieRouter')
const userRouter = require('./router/userRouter');
const app = express();
const cors = require("cors");

// Configure sessions to be used (using in-memory store, not for production)
app.use(expressSession({
    secret: "joiahjiufuioahefua", // used for encrypting the cookie, do not store in code and do not make publicly available
    resave: false,
    saveUninitialized: false, // only want sessions upon logging in
    cookie: {
        maxAge: 1 * 60 * 1000 * 1 // 1 minute cookie
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


//the following was set to allow cookies to be sent to port 3001 despite it not being origin
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true, // <= Accept credentials (cookies) sent by the client
}))

app.use("/", userRouter);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});







/******************   app.use("/Posts", isAuthenticated, require("./router/PostRouter"));
 * 
 * 
 * 
 * */
app.use("/Posts", PostRouter);
app.use("/", BookingRouter);
app.use("/", MovieRouter);
app.use("/", userRouter);


// initialise passport and indicate it should use sessions for logins
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors());

app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname + '/../' + 'public/login.html'));
});

app.get('/users', async (request, response) => {
    const user = await User.find();
    response.send(user);
})

app.get('/register', (request, response) => {
    response.sendFile(path.join(__dirname + '/../' + 'public/register.html'));
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

app.get('/logout', (request, response, next) => {

    console.log(request);
    request.logout((error) => {
        if (error) return next(error);
        response.cookie('connect.sid', "null", {
            httpOnly: true,
            expires: new Date('Thu, 01 Jan 1970 00:00:00 UTC')
        });
        request.session.destroy((error)=>{
            if (error) return next(error);
            response.redirect('/login');
        })

    });
})

app.get('/protected', checkAuthentication, (request, response) => {
    // if you are authenticated, remember that you can get the user from request.user
    return response.status(200).send("Hit route only members can see.");
});

function checkAuthentication(request, response, next) {
    // passport puts an isAuthenticated() method on the request object
    // - we can use this to check if a user is logged in or not
    if (request.isAuthenticated()) {
        return next();
    }
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
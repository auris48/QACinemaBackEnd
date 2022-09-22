const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { default: mongoose } = require("mongoose");
const User = require("./model/User");
const Booking = require("./model/Booking");
const Movies = require("./model/Movies");
const PostRouter = require("./router/PostRouter");
const BookingRouter = require("./router/BookingRouter");
const MovieRouter = require("./router/MovieRouter");
const userRouter = require("./router/userRouter");
const VenuesRouter = require('./router/VenuesRouter');
const app = express();
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LiavOHjxDELH0GArij6h5cpGnj88Q2vr5QDTSHBEO0UvLzhD8aBM088y2lU0GCbv6zat3PiG9GnMAYjF0MguPSM00AZ92EJQX"
);

app.use(
  expressSession({
    secret: "joiahjiufuioahefua", // used for encrypting the cookie, do not store in code and do not make publicly available
    resave: false,
    saveUninitialized: false, // only want sessions upon logging in
    cookie: {
      maxAge: 1 * 60 * 1000 * 1, // 1 minute cookie
    },
  })
);

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
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true, // <= Accept credentials (cookies) sent by the client
  })
);

app.use("/", userRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
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
app.use("/", VenuesRouter);

// initialise passport and indicate it should use sessions for logins
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors());
app.post("/create-checkout-session", async (req, res) => {
  const booking = await Booking.findById(req.body.booking);
  const movie = await Movies.findById(booking.movieID);
  const price =
    booking.noOfTickets.noOfAdult * 1000 +
    booking.noOfTickets.noOfChild * 500 +
    booking.noOfTickets.noOfConcession * 800;
  /*  console.log(req.body);
  console.log(booking); */
  console.log("hi");
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    line_items: [
      {
        billing_address_collection: "auto",
        price_data: {
          currency: "gbp",
          product_data: {
            name: movie.title,
            description: `Adult x${booking.noOfTickets.noOfAdult} Child x${booking.noOfTickets.noOfChild} Concession x${booking.noOfTickets.noOfConcession}`,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3001/paymentsuccess",
    cancel_url: "http://localhost:3001/paymentcancel",
  });
  /*   res.json({ id: session.id }); */
  res.status(200).send(session);
});

app.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname + "/../" + "public/login.html"));
});

app.get("/paymentform", (request, response) => {
  response.sendFile(path.join(__dirname + "/public/paymentform.html"));
});

app.get("/users", async (request, response) => {
  const user = await User.find();
  response.send(user);
});

app.get("/register", (request, response) => {
  response.sendFile(path.join(__dirname + "/../" + "public/register.html"));
});

app.post(
  "/login",
  passport.authenticate("local", {
    failureMessage: "Invalid login credentials.",
    failureRedirect: "/",
  }),
  (request, response) => {
    // upon successful login, passport will automatically create an express session for us to use
    response.status(200).send(request.user.username);
  }
);

app.post("/register", async (request, response) => {
  try {
    // register the user
    const user = await User.register(
      new User({
        username: request.body.username,
        dateOfBirth: request.body.dateOfBirth,
        email: request.body.email,
        isAdmin: request.body.isAdmin,
      }),
      request.body.password
    ); // register(userWithUsername, password)

    if (user) {
      passport.authenticate("local");
      // await User.findOneAndUpdate({'username': 'rossmorr8'}, {$set: {'age':"test2"}});
      return response.status(200).send(user);
    }
  } catch (error) {
    console.error(error);
  }
  response.status(400).send("Something went wrong registering the user...");
});

app.get("/logout", (request, response, next) => {
  console.log(request);
  request.logout((error) => {
    if (error) return next(error);
    response.cookie("connect.sid", "null", {
      httpOnly: true,
      expires: new Date("Thu, 01 Jan 1970 00:00:00 UTC"),
    });
    request.session.destroy((error) => {
      if (error) return next(error);
      response.redirect("/login");
    });
  });
});

app.get("/protected", checkAuthentication, (request, response) => {
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

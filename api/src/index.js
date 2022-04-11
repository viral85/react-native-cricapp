const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const winston = require("winston");
const expressWinston = require("express-winston");

const userController = require("./users/user.controller");
const betController = require("./bets/bet.controller");
const walletController = require("./wallet/wallet.controller");

const betResult = require("./cron/betresult");

dotenv.config({ path: ".env" });

const passportConfig = require("./config/passport");

const app = express();
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGODB_URI);
// console.log(process.env.MONGODB_URI);
mongoose.connection.on("error", err => {
  console.error(err);

  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

betResult();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true
    })
  })
);

app.disable("x-powered-by");

// Express logging using winston
const date = `${new Date().getFullYear()}-${new Date().getMonth() +
  1}-${new Date().getDate()}`;

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: `logs/error-${date}.log`,
        level: "error"
      }),
      new winston.transports.File({ filename: `logs/combined-${date}.log` })
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Auth
app.post("/login", userController.loginUser);
app.post("/register", userController.registerUser);
app.get("/user/verify/:token", userController.verifyEmail);
app.get("/user/profile", userController.userProfile);

// Bet
app.post("/bet", passportConfig.isAuthenticated, betController.placeBet);
app.get("/bet", passportConfig.isAuthenticated, betController.getBets);
app.get(
  "/bet/match/:match_id",
  passportConfig.isAuthenticated,
  betController.getBetsByMatch
);

// Wallet
app.post(
  "/wallet/add-cash",
  passportConfig.isAuthenticated,
  walletController.addCash
);
app.get(
  "/wallet/balance",
  passportConfig.isAuthenticated,
  walletController.getBalance
);
app.get(
  "/wallet/winnings",
  passportConfig.isAuthenticated,
  walletController.getWinnings
);
app.get(
  "/wallet/history",
  passportConfig.isAuthenticated,
  walletController.getHistory
);

app.listen(
  process.env.PORT
  // , () =>
  // console.log(`App is running on ${process.env.APP_URL}:${process.env.PORT}`)
);
module.exports = app;

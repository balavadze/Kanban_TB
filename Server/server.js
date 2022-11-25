// const src = require("./src");
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const cors = require("cors");
const corsHeaders = require('./middleware/cors');
const { config } = require('dotenv');

config();

//import passport middleware
require('./middleware/auth-middleware');

//initialize middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(corsHeaders);
app.use(passport.initialize());

//import routes

const authorizationRoutes = require('./routes/authorization');

//initialize routes
//! might change route
app.use('/', authorizationRoutes);

const appStart = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`The app is running at http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.log(`Error:${error.message}`);
  }
};

appStart();

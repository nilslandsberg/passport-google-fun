const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const User = require("./user");
const cors = require('cors')

const app = express();

mongoose.connect("mongodb://localhost/google-passport-fun", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: "1029895949938-sa6jtmu84j9k867bdfk6807kfet59t24.apps.googleusercontent.com",
      clientSecret: "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 ",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshToken);
      console.log("profile", profile);
    }
  )
);

const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

app.get("/auth/google", googleAuth);

app.get("/auth/google/callback", passport.authenticate("google"));

app.listen(8000);
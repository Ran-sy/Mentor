const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const User = require("./Models/userModel");

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = "c85635160d89f53c5dc8";
const GITHUB_CLIENT_SECRET = "0f247fb50f46493274df9965762ccdeafe6322b7";

const FACEBOOK_APP_ID = 631204805643898;
const FACEBOOK_APP_SECRET = "a58e6608f99d6e2b1fceea0b881a939d";
const GOOGLE_CLIENT_ID =
  "154527221504-i823onaq0kidckrogrluhn4m8ck3fg88.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          console.log("user is there");

          done(null, existingUser);
        } else {
          const newUser = {
            googleId: profile.id,
            name: profile.displayName,

            email: profile.emails[0].value,
          };
          const user = await User.create(newUser);
          console.log("creating new user");
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        console.log(profile);
        const existingUser = await User.findOne({ gitId: profile.id });
        if (existingUser) {
          console.log("user is there");

          done(null, existingUser);
        } else {
          console.log(profile);
          const newUser = {
            gitId: profile.id,
            name: profile.username,
            email: profile.profileUrl,
          };
          const user = await User.create(newUser);

          console.log("creating new user");
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",

      profileFields: ["id", "emails", "name", "displayName"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          console.log("user is there");

          done(null, existingUser);
        } else {
          console.log(profile);
          const newUser = {
            facebookId: profile.id,
            name: profile.displayName,
          };
          const user = await User.create(newUser);
          console.log("creating new user");

          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

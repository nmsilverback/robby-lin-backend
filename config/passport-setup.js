const passport = require('passport')
const keys = require('./secrets.js')
const User = require('../models/users-model.js')
const GitHubStrategy = require('passport-github2').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.serializeUser((user, done) => {
  console.log('serializeUser:' + user.id);
  done(null, user)
})

passport.deserializeUser((user, done) => {
  User.findById(user.id).then((user) => {
    done(null, user);
  });
})

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/github/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    // done(null, profile)

    User.findOrCreate({ oauth_id: profile.id }, function (err, user) {
      if(err) {
        console.log(err);
      }
      if(!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          oauth_id: profile.id,
          username: profile.displayname,
          email: profile.emails[0].value,
        });
        user.save(err => {
          if(err) {
            console.log(err);
          } else {
            console.log('saving user');
            done(null, user);
          }
        });
      }
    });
  }

))

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    // done(null, profile)

    User.findOrCreate({ oauth_id: profile.id }, function (err, user) {
      if(err) {
        console.log(err);
      }
      if(!err && user !== null) {
        done(null, user);
      } else {
        user = new User({
          oauth_id: profile.id,
          username: profile.displayname,
          email: profile.emails[0].value,
          first_name: profile.name.givenName,
          lastName: profile.name.familyName,
        });
        user.save(err => {
          if(err) {
            console.log(err);
          } else {
            console.log('saving user');
            done(null, user);
          }
        });
      }
    });
  }
))
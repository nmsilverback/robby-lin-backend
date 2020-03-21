const passport = require('passport')
const keys = require('./secrets.js')
const User = require('../models/users-model.js')
const GitHubStrategy = require('passport-github2').Strategy
// const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(new GitHubStrategy(
  {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:7555/api/auth/github/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    done(null, profile)
  }


))
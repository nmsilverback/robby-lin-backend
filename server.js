const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
require('./config/passport-setup.js');
const keys = require('./config/secrets.js')
const authenticate = require('./middleware/restricted-middleware.js')

const errorHandler = require('./middleware/errorHandler.js');
const usersRouter = require('./routers/users-router.js');
// const authRouter = require('./routers/authentication-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
server.use(passport.initialize());
server.use(passport.session());


server.get('/', (req, res) => {
  res.send('Hello Findur.City');
});

server.use('/api/users', usersRouter);
// server.use('/api/auth', authRouter);

server.get('/api/auth/github', passport.authenticate('github'), (req, res) => {});
server.get(
  '/api/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`/api/users/:${req.session.passport.user}`)
  });

server.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plug.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ] })
);
server.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect(`/api/users/:${req.session.passport.user}`)
);

server.use(errorHandler);

// 404 Handler
server.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

module.exports = server;

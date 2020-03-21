const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport')
const passportSetup = require('./config/passport-setup.js')
const keys = require('./config/secrets.js')
const authenticate = require('./middleware/restricted-middleware.js')

const errorHandler = require('./middleware/errorHandler.js');
const usersRouter = require('./routers/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));


server.get('/', (req, res) => {
  res.send('Hello Findur.City');
});

server.use('/api/users', usersRouter);

server.use(errorHandler);

// 404 Handler
server.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

module.exports = server;

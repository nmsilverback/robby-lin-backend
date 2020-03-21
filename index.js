if (process.env.ENV !== 'production') {
  require('dotenv').config();
}

console.log(process.env.ENV)

const server = require('./server');

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n*** Server listening on ${PORT} ***\n`);
});

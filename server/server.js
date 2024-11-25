const http = require('http');
const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 5005;

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server started at port ' + port);
});

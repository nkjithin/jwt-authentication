const express    = require('express');
const bodyParser = require('body-parser')
const cors       = require('cors');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
}); 

app.use(require('./authenticate'));

const port = process.env.PORT || 3000;

const server = app.listen(port);
module.exports = server;
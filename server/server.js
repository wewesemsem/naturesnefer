const express = require('express');
const app = express();
const path = require('path');

//logging
app.use(require('morgan')('dev'));

//body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static files
app.use(express.static(path.join(__dirname, '../build')));

///api routes
app.use('/api', require('./apiRoutes'));

//all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;

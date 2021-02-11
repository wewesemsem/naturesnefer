const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const db = require('./db');
const passport = require('passport');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// logging
app.use(require('morgan')('dev'));

// body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// compression
app.use(require('compression')());

// database store
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
dbStore.sync();

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.session.guestCart) req.session.guestCart = [];
  next();
});

app.use((req, res, next) => {
  console.log('SESSION: ', req.session);
  next();
});

// static files
app.use(express.static(path.join(__dirname, '../build')));

// auth & api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./apiRoutes'));

// all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;

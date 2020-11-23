const router = require('express').Router();
const User = require('../db/models/user');
const smtpTransport = require('../smtpTransport');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Incorrect email and/or password.');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Incorrect email and/or password.');
    } else {
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const message = 'Thanks for signing up,' + user.firstName + '!';
    const mailOptions = {
      to: user.email,
      subject: "Welcome to Nature's Nefer",
      text: message,
    };
    smtpTransport.sendMail(mailOptions);
    req.login(user, (err) => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.delete('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));

router.post('/forgot-password', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('This email does not belong to an account.');
    } else {
      //send email with reset password link
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

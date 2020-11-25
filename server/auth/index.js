const router = require('express').Router();
const User = require('../db/models/user');
const smtpTransport = require('../smtpTransport');
const crypto = require('crypto');

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
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; //1 hour
      user.save();

      const message =
        'Reset:\n\n http://' + req.headers.host + '/reset/' + token;
      const mailOptions = {
        to: user.email,
        subject: "Nature's Nefer Password Reset",
        text: message,
      };
      smtpTransport.sendMail(mailOptions);
      res
        .status(200)
        .send(
          'An e-mail has been sent to ' +
            user.email +
            ' with further instructions.'
        );
    }
  } catch (err) {
    next(err);
  }
});

router.get('/reset', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.body.token,
        resetPasswordExpires: { $gt: Date.now() },
      },
    });
    if (!user) {
      console.log('Token expired or invalid.');
      res.status(401).send('This link has expired.');
    } else res.status(200);
  } catch (err) {
    next(err);
  }
});

router.post('/reset', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.body.token,
        resetPasswordExpires: { $gt: Date.now() },
      },
    });
    if (!user) {
      console.log('Token expired or invalid.');
      res.status(401).send('This link has expired.');
    } else {
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save();

      const message =
        "This is confirmation that the password for your Nature's Nefer account has been changed.";
      const mailOptions = {
        to: user.email,
        subject: 'Your password has been changed',
        text: message,
      };
      smtpTransport.sendMail(mailOptions);

      req.login(user, (err) => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

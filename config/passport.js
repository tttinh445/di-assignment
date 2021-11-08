const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email: email }).then((user) => {
    if (!user || !user.comparePassword(password, user.password)) {
      return done(null, false, {
        'message': 'email or password is not correct.'
      });
    }
    return done(null, user);
  }).catch(done);
}));

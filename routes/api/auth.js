const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const User = mongoose.model('User');

router.post('/login', async (req, res, next) => {
    // const email = req.body.email;
    // const password = req.body.password;

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (user) {
        return res.json({
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
          },
          token: user.generateJWT({id: user._id})
        });
      } else {
        return res.status(400).json(info);
      }
    })(req, res, next);
  });

module.exports = router;

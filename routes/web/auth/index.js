const express = require('express');
const router = express.Router();

/**
 * Routes Definitions
 */

router.get("/login", (req, res) => {
  return res.render('auth/login', { title: 'Xxxx' });
});

router.get("/register", (req, res) => {
  return res.render('auth/register', { title: 'Xxxx' });
});

module.exports = router;

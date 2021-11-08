const express = require('express');
const router = express.Router();

/**
 * Routes Definitions
 */

router.get("/login", (req, res) => {
  return res.render('auth/login', { title: 'Xxxx' });
});

module.exports = router;

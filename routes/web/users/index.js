const express = require('express');
const router = express.Router();


/**
 * Routes Definitions
 */

router.get("/", (req, res) => {
  return res.render('users/index', { title: 'User' });
});


module.exports = router;

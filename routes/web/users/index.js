const express = require('express');
const router = express.Router();


/**
 * Routes Definitions
 */

router.get("/", (req, res) => {
  return res.render('users/index', { title: 'User' });
});

router.get("/edit/:id", (req, res) => {
  const userId = req.params.id;
  return res.render('users/edit', { title: 'Update User', userId});
});


module.exports = router;

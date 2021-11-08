const router = require('express').Router();
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

router.get("/", (req, res) => {
  return res.redirect('/users');
});

router.use(function (err, req, res, next) {
  return next(err)
});

module.exports = router;

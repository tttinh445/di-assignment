const express = require('express');
const router = express.Router();
const {
  body,
  validationResult
} = require('express-validator');

router.post('/login', async (req, res, next) => {
  return res.status(200).json({ok: 200});
});

module.exports = router;

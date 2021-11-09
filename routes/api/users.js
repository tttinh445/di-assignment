const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const UserModel = mongoose.model('User');
const auth = require("../../middleware/auth");

const transform = (result) => {
  return {
    id: result._id,
    fullName: result.fullName,
    email: result.email,
    createdAt: result.createdAt,
  }
}

/* GET users listing. */
router.get('/', auth, async (req, res) => {
  const users = await UserModel.find();
  res.status(200).send(users.map(item => {
    return transform(item)
  }));
});

/* POST create users. */
router.post('/', async (req, res, next) => {
  try {
    const userModel = new UserModel(req.body);
    const result = await userModel.save();
    return res.status(201).json(transform(result));
  } catch(error) {
    if (error.message.indexOf('duplicate key error') !== -1) {
      return res.status(400).json({ message: "email already exists" });
    }
    next(error)
  }
});

/* GET user. */
router.get('/:id', auth, async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    return res.json(transform(user));
  } catch(error) {
    next(error)
  }
});

/* PUT update user. */
router.put('/:id',
  body('fullName').not().isEmpty().withMessage(`can't be blank`),
  body('email').isEmail().withMessage('must be an email'),
  auth,
  async (req, res, next) => {
  try {
    const errors = validationResult(req).formatWith(({ location, msg, param, value, nestedErrors }) => msg);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors:errors.mapped()});
    }

    const user = await UserModel.findOne({ _id: { $ne: req.params.id }, email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "email already exists" });
    }


    await UserModel.updateOne({ _id: req.params.id }, req.body);
    return res.status(200).json({ success: true });
  } catch(error) {
    if (error.message.indexOf('duplicate key error') !== -1) {
      return res.status(400).json({ message: "email already exists" });
    }
    next(error)
  }
});

/* DELETE remove item */
router.delete('/:id', auth, async (req, res, next) => {
  try {
    // dont allow delete yourself
    if (req.params.id == req.user.id) {
      return res.status(400).json({ message: "don't allow delete yourself." });
    }
    const result = await UserModel.remove({ _id: req.params.id });
    return res.json({success: result.deletedCount === 1});
  } catch(e) {
    return res.status(500).json({ message: "internal server error." });
  }
});

module.exports = router;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "can't be blank"],
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
    minLength: [6, 'must be at least 6 characters'],
    maxLength: [50, 'must be not greater then 50 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'must be an email'],
    index: true
  },
}, {
  timestamps: true
});

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

UserSchema.methods.generateJWT = (payload = {}) => {
  payload.time = new Date().getTime();
  return jwt.sign(payload, config.jwtSecret, {expiresIn: parseInt(config.jwtExpiresIn)});
};

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

mongoose.model('User', UserSchema);

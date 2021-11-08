const jwt = require("jsonwebtoken");
const config = require('../config');

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}


const verifyToken = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  return next();
};

module.exports = verifyToken;

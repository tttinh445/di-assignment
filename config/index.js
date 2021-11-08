module.exports = {
  jwtSecret: process.JWT_SECRET | 'xxx',
  jwtExpiresIn: process.JWT_EXPIRES_IN | 3600000
}

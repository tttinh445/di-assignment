module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'xxx',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || 3600000
}

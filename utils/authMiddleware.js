const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({msg: 'No token, authorization denied'});
  }
  try {
    const jwtSecret = config.get('jwtSecret');
    const decodedToken =jwt.verify(token, jwtSecret);
    req.user = decodedToken.user;
    next();
  } catch (e) {
    res.status(401).json({msg: 'Token is not valid'});
  }
};
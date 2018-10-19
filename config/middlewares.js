const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

// quickly see what this file exports
module.exports = {
  authenticate,
  generateToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');
  if (token) {
    console.log('we have a token');
    jwt.verify(token, jwtKey, (err, decoded) => {
      console.log('The Error:', err);
      if (err) return res.status(401).json(err);
      console.log('we have no error');
      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function generateToken(user) {
  const jwtPayload = {
    ...user,
  }
  const jwtOptions = {
    expiresIn: '2m'
  }
  return jwt.sign(jwtPayload, jwtKey, jwtOptions)
}

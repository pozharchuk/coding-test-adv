const jwt = require('jsonwebtoken');

// Middleware function to check for a valid token
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.SIGNING_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

class AuthService {
  static getToken() {
    return jwt.sign(
      { user: 'somevaliduser' },
      process.env.SIGNING_KEY,
      { expiresIn: '2 days' },
    );
  }
}

module.exports = {
  authenticateJWT,
  AuthService,
};

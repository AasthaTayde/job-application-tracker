const jwt = require("jsonwebtoken");//import libraries used to work with JWTs

function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;//retrieves token from the request's cookies

    if (!token) {//missing token
      return res.status(401).json({ message: "Authentication required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);//checks token's signature using your secret key and checks its validity,exp etc.
    req.userId = decoded.userId;//retrieves user id stored in the jwt paload and attaches the id to the request so later middleware or controllers can use it.
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired session." });//verification fails
  }
}

module.exports = requireAuth;

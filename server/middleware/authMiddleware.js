const jwt = require("jsonwebtoken");
const User = require("../models/userModal");


const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }
       req.user = user;

   next();
    } catch (error) {
      res.status(401);
      res.json({ message: "Not authorized, token failed" });
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized, no token" });
    throw new Error("Not authorized, no token");
  }
};

module.exports = { auth };

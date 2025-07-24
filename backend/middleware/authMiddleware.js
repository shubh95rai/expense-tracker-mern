import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function protect(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // add user to request object

    next();
  } catch (error) {
    console.log("Error in protect middleware:", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

export function adminOnly(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden - Admin only" });
    }

    next();
  } catch (error) {
    console.log("Error in adminOnly middleware:", error.message);

    res.status(500).json({ message: "Server error" });
  }
}

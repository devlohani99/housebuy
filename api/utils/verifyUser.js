import user from "../models/user.model.js";
import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token; // Ensure safe access to cookies

  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET || "defaultSecret", (err, decodedUser) => {
    if (err) {
      return next(errorHandler(403, "Forbidden: Invalid or expired token"));
    }

    req.user = decodedUser;
    next();
  });
};



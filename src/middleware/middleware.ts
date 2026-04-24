import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IExtendedRequest } from "./type";

import user from "../database/models/user.model";

interface Idecode {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

class Middleware {
  static async isloggedIn(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction,
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader;
    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as Idecode;
      console.log("Decoded token:", decoded);

      {
        const userData = await user.findByPk(decoded.id);
        if (!userData) {
          res.status(404).json({ message: "User not found" });

          return;
        }
        console.log("user data:", userData);
        req.user = userData;

        next();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Invalid token" });
      return;
    }
  }
}
export default Middleware;

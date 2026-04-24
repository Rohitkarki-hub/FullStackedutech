import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// const registerUser = async (req: Request, res: Response) => {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   } else {
//     await User.create({ username, email, password })
//       .then((user) => {
//         res.status(201).json({ message: "User registered successfully", user });
//       })
//       .catch((err) => {
//         res.status(500).json({ message: "Error registering user", error: err });
//       });
//   }
// };

// export { registerUser };

class AuthController {
  static async registerUser(req: Request, res: Response) {
    if (req.body === undefined) {
      return res.status(400).json({ message: "Request body is missing" });
    }
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    } else {
      await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 12),
      })
        .then((user) => {
          res
            .status(201)
            .json({ message: "User registered successfully", user });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error registering user", error: err });
        });
    }
  }
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await User.findAll({ where: { email } });
    if (data.length === 0) {
      res.status(404).json({ message: "User not registered" });
    } else {
      bcrypt
        .compare(password, data[0].password)
        .then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign(
              { id: data[0].id },
              process.env.JWT_SECRET as string,
              { expiresIn: "1d" },
            );
            res.status(200).json({ message: "Login successful", token });
          } else {
            res.status(401).json({ message: "Invalid credentials" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Error occurred ", error: err });
        });
    }
  }
}

export default AuthController;

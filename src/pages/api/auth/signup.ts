import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import dbConnedction from "../../../services/dbConnection";
import User from "../../../models/user";
import UserView from "../../../views/userView";

dbConnedction();

export default async function SignIn(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if( req.method !== "POST" ) {
    return res.status(400).json({ error: "Method not allowed" });
  }
  const { name, email, password } = req.body;
  if( !email || !password ) {
    return res.status(400).json({ error: "Please add all the fields" });
  }
  const users = await User.find({
    email
  })

  if( users.length != 0 ) {
    return res.status(400).json({ error: "User already exists" });
  }
  const user = new User({
    name,
    email,
    password
  });

  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
  res.setHeader("Set-Cookie", `user=${user._id}; path=/, httponly`);
  res.setHeader("Set-Cookie", `token=${token}; path=/`);
  return res.status(200).json({ user: UserView(user), token });
}
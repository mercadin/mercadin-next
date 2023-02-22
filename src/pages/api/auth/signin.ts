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
    console.log("Method not allowed")
    return res.status(400).json({ error: "Method not allowed" });
  }

  const token = req.cookies.token;
  if(token) {
    console.log("Already logged in")
    return res.status(400).json({ error: "Already logged in" });
  }

  const { email, password } = req.body;
  if( !email || !password ) {
    console.log("Please add all the fields");
    return res.status(400).json({ error: "Please add all the fields" });
  }
  const user = await User.findOne({
    email
  })

  if( !user ) {
    console.log("User not exists")
    return res.status(400).json({ error: "User not exists" });
  }

  if(user.password === password) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string);
    res.setHeader("Set-Cookie", `user=${user._id}; path=/, httponly`);
    res.setHeader("Set-Cookie", `token=${token}; path=/`);
    console.log("Logged in", user.email)
    return res.status(200).json({ user: UserView(user), token });
  }
}
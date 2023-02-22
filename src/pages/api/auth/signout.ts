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
  res.setHeader("Set-Cookie", `user=deleted; path=/, httponly`);
  res.setHeader("Set-Cookie", `token=deleted; path=/`);
  
  return res.status(200).json({ message: "Logged out" });
  
}
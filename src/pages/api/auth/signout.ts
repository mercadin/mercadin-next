import { NextApiRequest, NextApiResponse } from "next";

import dbConnedction from "../../../services/dbConnection";

dbConnedction();

export default async function SignIn(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  res.setHeader("Set-Cookie", `user=deleted; path=/, httponly`);
  res.setHeader("Set-Cookie", `token=deleted; path=/`);
  
  return res.status(200).json({ message: "Logged out" });
  
}
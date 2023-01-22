import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/user';
import { Payload } from '../types/payload';
import dbConnection from './dbConnection';

dbConnection();

export default async function Authenticate(
  request: NextApiRequest, 
  response: NextApiResponse, 
  next: Function
) {
  const token = request.cookies.token || request.headers.authorization?.split(' ')[1];

  if(!token) {
    return response.status(401).json({
      error: 'You are not logged in'
    })
  }
  try{
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as Payload;

    const user = await User.findById(jwtPayload._id);

    const payload: Payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar
    }

    return next(request, response, payload);
  }catch(e){
    return response.status(401).json({
      error: 'Invalid token'
    })
  }
}
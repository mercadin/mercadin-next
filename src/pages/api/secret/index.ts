import { NextApiRequest, NextApiResponse } from 'next';
import Authenticate from '../../../services/authenticate';

export default async function secret(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  switch(req.method) {
    case 'GET':
      return getSecret(req, res);
      
    case 'POST':
      return Authenticate(req,res, postSecret);
    
    default:
      return res.status(405).json({
        error: 'Method not allowed'
      });
  }
}

function getSecret(req: NextApiRequest, res: NextApiResponse){
  return res.json({
    message: 'testando o get'
  });
}

async function postSecret(req: NextApiRequest, res: NextApiResponse, payload: any){
  return res.json({
    message: 'testando o post',
    payload
  });
}
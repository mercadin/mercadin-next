import { NextApiRequest, NextApiResponse } from 'next';
import ShoppingListModel from '../../../models/shoppingList';
import Authenticate from '../../../services/authenticate';
import { Payload } from '../../../types/payload';

export default async function shoppingList(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  switch(req.method) {
    case 'GET':
      return Authenticate(req, res, getShoppingList);
      
    case 'POST':
      return Authenticate(req,res, postShoppingList);
    
    case 'PUT':
      return Authenticate(req, res, updateShoppingList);

    default:
      return res.status(405).json({
        error: 'Method not allowed'
      });
  }
}

async function getShoppingList(req: NextApiRequest, res: NextApiResponse, payload: Payload){
  console.log('get shopping list', payload)
  const shoppingLists = await ShoppingListModel.find({
    ownerId: payload._id
  })
  console.log(shoppingLists)
  return res.json(shoppingLists)
}

async function postShoppingList(req: NextApiRequest, res: NextApiResponse, payload: Payload){
  console.log('post shopping list', payload);
  const shoppingList = await ShoppingListModel.create({
    ownerId: payload._id,
    name: req.body.name,
    items: []
  })

  return res.json(shoppingList)
}

async function deleteShoppingList(req: NextApiRequest, res: NextApiResponse, payload: Payload){
  await ShoppingListModel.deleteOne({
    _id: req.body.id
  });
  return res.json({ message: 'Shopping list deleted' })
}

async function updateShoppingList(req: NextApiRequest, res: NextApiResponse, payload: Payload){
  const {
    list = [],
    id
  } = req.body;
  const shoppingList = await ShoppingListModel.findOne({
    _id: id,
    ownerId: payload._id
  });
  if(!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' })
  }
  shoppingList.items = list;
  await shoppingList.save();
  return res.json(shoppingList)
}

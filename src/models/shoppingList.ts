import mongoose, { Schema } from "mongoose";



const ShoppingListSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true
  },

  name: {
    type: String,
    required: true
  },
  
  itens: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    estimatedPrice: Number,
    realPrice: Number,
    image: String,
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ShoppingListModel = mongoose.models.ShoppingList || mongoose.model("ShoppingList", ShoppingListSchema);

export default ShoppingListModel;
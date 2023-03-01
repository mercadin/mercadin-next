import mongoose, { Schema } from "mongoose";

export interface IUser {
  _id?: string,
  name?: String,
  email: String,
  password: String,
  avatar?: String,
  createdAt?: Date
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
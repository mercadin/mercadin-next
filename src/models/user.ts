import mongoose from "mongoose";

export interface IUser {
  _id?: string,
  name?: String,
  email: String,
  password: String,
  avatar?: String,
  createdAt?: Date
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
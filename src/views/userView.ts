import { IUser } from "../models/user";

export default function UserView(user: IUser) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.createdAt,
  }
}
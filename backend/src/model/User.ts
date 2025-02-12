import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  profilePicture?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const UserSchema = mongoose.model<IUser>("User", userSchema);

export default UserSchema;

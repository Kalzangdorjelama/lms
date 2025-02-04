import mongoose, { Schema } from "mongoose";

// fixed hunxa role ma value student or admin
export enum Role {
  Student = "student",
  Admin = "admin",
}

export interface IUser extends Document {
  username: string;
  profileImage: string;
  email: string;
  role: Role;
  // role: "student" | "admin" --> not a reuseable code so we use enum to get value
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [Role.Student],
    // enum: ["student"] --> can be done like this but not a good practice
    default: Role.Student,
  },
  profileImage: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

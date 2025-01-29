import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  googleId: {
    type: String,
  },
  profileImage: {
    type: String,
  },
});

 export const User = mongoose.model("User", userSchema);
 

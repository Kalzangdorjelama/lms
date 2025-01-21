import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  googleID: {
    type: String,
  },
  profileImage: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

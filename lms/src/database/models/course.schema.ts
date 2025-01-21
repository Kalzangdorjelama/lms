import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  courseName: String,
  courseDescription: {
    type: String,
  },
  coursePrice: {
    type: Number,
  },
  courseDuration: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

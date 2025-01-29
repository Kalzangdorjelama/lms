import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
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

export const Course = mongoose.model("Course", courseSchema);

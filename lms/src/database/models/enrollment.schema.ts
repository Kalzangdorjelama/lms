import mongoose, { Schema } from "mongoose";

// In TypeScript with Mongoose, extends Document means that the interface inherits properties from Mongoose's Document type.
// extends Document means that your interface will inherit all Mongoose document properties, like _id, save(), and timestamps (createdAt, updatedAt).
// What is Document in Mongoose?
// ===> In Mongoose, Document represents a MongoDB document stored in a collection. When you query or create a record using Mongoose, it returns a document object.

interface IEnrollment extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  enrolledAt: Date;
  enrollmentStatus: EnrollmentStatus;
  whatsapp: string;
}

enum EnrollmentStatus {
  Approve = "approve",
  Reject = "reject",
  Pending = "pending",
}

const enrollmentSchema = new Schema<IEnrollment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  enrolledAt: {
    type: Date,
    default: Date.now(),
  },
  enrollmentStatus: {
    type: String,
    enum: [
      EnrollmentStatus.Approve,
      EnrollmentStatus.Reject,
      EnrollmentStatus.Pending,
    ],
    default: EnrollmentStatus.Pending,
  },
  whatsapp: String,
});

const Enrollment =
  mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;

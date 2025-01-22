import dbConnect from "@/database/connection";
import User from "@/database/models/user.schema";

export async function GET() {
  dbConnect()
  await User.create({
    username: "kalzang",
    email: "kalzanglama77@gmail.com",
    googleId: "123121412412",
    profileImage: "23414424sdf",
  })
  return Response.json({
    message: "you hit api route",
  });
}

// check user is authenticated or not
// check admin or not



// check if incoming req/user is logged in also check if logged in -->
// role admin or not
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@/database/models/user.schema";
//@ts-ignore
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = async (req: NextRequest) => {
  // NOTE: server side ma token chai ye ko xa bane getServerSession use garne and in client side ma chaiye ko xa bane useSession() use gare ne
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== Role.Admin) {
    return Response.json(
      {
        messsage: "You dont have permission to perform this action",
      },
      { status: 401 }
    );
  }
  // next() i.e. go to next middleware
  return NextResponse.next();
};

export default authMiddleware;




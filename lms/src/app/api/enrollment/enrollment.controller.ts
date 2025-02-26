import dbConnect from "@/database/connection";
import Enrollment from "@/database/models/enrollment.schema";

export async function enrollCourse(req: Request) {
  try {
    await dbConnect();
    const { whatsapp, course } = await req.json();
    const data = await Enrollment.create({  // Input Type ==>	Single document {} ko return type ==> Object {} and for Input Type ==> Multiple documents [{},{},...] ko return type ==> Array of objects [{},{},...]

      whatsapp,
      course,
      student: "7",   // session.user.id aauxa here
    });
    if (!data) {
      return Response.json(
        {
          message: "something went wrong",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        message: "you are enrolled in course",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function fetchEnrollments() {
  try {
    await dbConnect();
    const data = await Enrollment.find().populate("course").populate("student"); // return an array 
    if (data.length === 0) {
      return Response.json(
        {
          message: "no enrollment found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Enrollments fetched!!",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function fetchEnrollment(id: string) {
  try {
    await dbConnect();
    const data = await Enrollment.findById(id)
      .populate("course")
      .populate("student"); // returns an object
    if (!data) {
      return Response.json(
        {
          message: "no enrollment is found with this id",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "enrollment fetched!!",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function changeEnrollmentStatus(req: Request, id: string) {
  try {
    await dbConnect();
    const { status } = await req.json();
    const data = await Enrollment.findByIdAndUpdate(id, { //  returns an object
      enrollmentStatus: status,
    });
    return Response.json(
      {
        message: "enrollment status updated!!",
        data
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function deleteEnrollment(id: string) {
  try {
    await dbConnect();
    await Enrollment.findByIdAndDelete(id); // returns an object
    return Response.json(
      {
        message: "enrollment deleted!!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

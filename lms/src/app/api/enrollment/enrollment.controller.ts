import dbConnect from "@/database/connection";
import Course from "@/database/models/course.schema";
import Enrollment from "@/database/models/enrollment.schema";
import Payment, { PaymentMethod } from "@/database/models/payment.schema";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import authMiddleware from "../../../../middleware/auth.middleware";
import { NextRequest } from "next/server";

export async function enrollCourse(req: Request) {
  try {
    await dbConnect();
    const response = await authMiddleware(req as NextRequest);
    if (response.status === 401) {
      return response;
    }

    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    const { whatsapp, course, paymentMethod } = await req.json();
    const enrollmentData = await Enrollment.create({
      // Input Type ==>	Single document {} ko return type ==> Object {} and for Input Type ==> Multiple documents [{},{},...] ko return type ==> Array of objects [{},{},...]
      whatsapp,
      course,
      student: userId, // session.user.id aauxa here
    });
    const courseData = await Course.findById(course);
    let paymentUrl;
    if (paymentMethod === PaymentMethod.Esewa) {
      // Esewa payment integration
    } else {
      // Khalti payment integration
      const data = {
        return_url: "http://localhost:3000",
        website_url: "http://localhost:3000",
        amount: courseData.price * 100,
        purchase_order_id: enrollmentData._id,
        purchase_order_name: "order_" + enrollmentData._id,
      };
      const response = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        data,
        {
          headers: {
            Authorization: "key b0e09fdaac84494dbd5bb760806cccc5",
            "Content-Type": "application/json",
          },
        }
      );
      
      // console.log(response, "RESPONSE");
  
      paymentUrl = response.data.payment_url
      await Payment.create({
        enrollment: enrollmentData._id,
        amount: courseData.price,
        paymentMethod: paymentMethod.Khalti,
      });
    }
    if (!enrollmentData) {
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
        data: {
          ...enrollmentData,
          paymentUrl
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.response);
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
    const data = await Enrollment.findByIdAndUpdate(id, {
      //  returns an object
      enrollmentStatus: status,
    });
    return Response.json(
      {
        message: "enrollment status updated!!",
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

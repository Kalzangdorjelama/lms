import dbConnect from "@/database/connection";
import Course from "@/database/models/course.schema";
import Lesson from "@/database/models/lesson.schema";
import { log } from "console";

export async function createCourse(req: Request) {
  try {
    await dbConnect();
    const { title, description, price, duration, category } = await req.json();
    const createdData = await Course.create({
      title,
      description,
      price,
      duration,
      category,
    });
    const data = await Course.findById(createdData._id).populate("category")
    return Response.json(
      {
        message: "Course created!!",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function fetchCourses() {
  try {
    await dbConnect();
    // const data = await Course.find();  // find() le return array []

    const data = await Course.find().populate("category"); // find() le return array []
    
    if (data.length === 0) {
      return Response.json(
        {
          message: "course NOT FOUND",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "Courses is successfully fetch!!",
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

export async function fetchCourse(id: string) {
  try {
    await dbConnect();
    const data = Course.findById(id);
    if (!data) {
      return Response.json(
        {
          message: "no course with that id FOUND",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "course is successfully fetch!",
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

export async function deleteCourse(id: string) {
  try {
    await dbConnect();
    await Course.findByIdAndDelete(id);
    await Lesson.deleteMany({ course: id }); // Lesson ma bako course ko id lai delete garxa eg; NEXTJS (_id: j211j132kj1 ) ko lesson sabai delete hunxa
    return Response.json(
      {
        message: "course deleted",
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

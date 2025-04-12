import dbConnect from "@/database/connection";
import Lesson from "@/database/models/lesson.schema";

export async function createLesson(req: Request) {
  try {
    await dbConnect();
    const { title, description, videoUrl, course } = await req.json();
    const data = await Lesson.create({
      title,
      description,
      videoUrl,
      course,
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
        message: "lesson created successfully!",
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

export async function fetchLessons(req:Request) {
  try {
    await dbConnect();
    const {searchParams} = new URL(req.url)
    const courseId = searchParams.get("courseId")
    // console.log("IUD",courseId );
    const data = await Lesson.find({
      course:courseId
    }).populate("course");
    if (data.length === 0) {
      return Response.json(
        {
          message: "no Lesson found",
          data: []
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "lesson fetch successfully!",
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

export async function fetchLesson(id: string) {
  try {
    await dbConnect();
    const data = await Lesson.findById(id);
    if (!data) {
      return Response.json(
        {
          message: "no lesson is found with this id",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        message: "lesson id is found successfully!",
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

export async function deleteLesson(id: string) {
  try {
    await dbConnect();
    const data = await Lesson.findByIdAndDelete(id);
    return Response.json(
      {
        message: "lesson id is deleted successfully!",
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

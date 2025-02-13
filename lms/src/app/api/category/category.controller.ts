import dbConnect from "@/database/connection";
import Category from "@/database/models/category.schema";
import { NextRequest } from "next/server";
import authMiddleware from "../../../../middleware/auth.middleware";

export async function createCategory(req: Request) {
  try {
    // authMiddleware(req as NextRequest);
    await dbConnect();
    const { name, description } = await req.json(); // req.body
    const existingCategory = await Category.findOne({
      name: name,
    });
    if (existingCategory) {
      return Response.json(
        {
          message: "Category is already existed with that name!!",
        },
        {
          status: 400,
        }
      );
    }
    const createCategory = await Category.create({
      name: name,
      description: description,
      //   key ra value same xa bane yauta matra lakda hunxa like below
      //   name,
      //   description
    });
    return Response.json(
      {
        message: "Category is succesfully created",
        data: createCategory,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

export async function getCategories() {
  try {
    await dbConnect();
    const categories = await Category.find(); // findone --> re object, findId --> re ob, find --> return array
    if (categories.length === 0) {
      return Response.json(
        {
          message: "No categories found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        message: "Category fetched successfully !!",
        data: categories,
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

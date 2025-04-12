import { EnrollmentStatus } from "@/database/models/enrollment.schema";
import { Status } from "../category/types";

interface IStudent{
    _id: string
    username: string,
    email: string
}

interface ICourse{
    _id: string
    title: string,
    price: number
}

export interface IEnrollment {
  _id?: string;
  student: IStudent;
  course: ICourse;
  enrollAt: string;
  enrollmentStatus: EnrollmentStatus;
  whatapp: string;
}

export interface IInitialData {
  status: Status;
  enrollments: IEnrollment[];
}

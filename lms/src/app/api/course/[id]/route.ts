import { deleteCourse, fetchCourse } from "../course.controller";

export async function GET(
  request: Request,
  { params }: { params: { id: string } } // id name folder ma k xa tai nam lakne
) {
  const { id } = await params;
  return fetchCourse(id);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } } // id name folder ma k xa tai nam lakne
) {
  const { id } = await params;
  return deleteCourse(id);
}

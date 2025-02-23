import { deleteCategory } from "../category.controller";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return deleteCategory(id);

  // below code work hai but error aauxa  ERROR: params shoud be awaited before using its properties.
  // const id = await params.id
  // return deleteCategory(id)
}

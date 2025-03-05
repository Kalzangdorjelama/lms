import { deleteCategory } from "../category.controller";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  return deleteCategory(request, id);

  // below code work hai but error aauxa  ERROR: params shoud be awaited before using its properties.
  // const id = await params.id
  // return deleteCategory(id)
}

// ========= my code =========
// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await params;
//   return (id);

//   // below code work hai but error aauxa  ERROR: params shoud be awaited before using its properties.
//   // const id = await params.id
//   // return deleteCategory(id)
// }
// ===========================

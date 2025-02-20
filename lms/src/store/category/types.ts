export enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  createdAt: string;

  // _id: "67a20c90e49f93e1caef6801"
  // name: "MERN Stack full course"
  // description: "six month mern course"
  // createdAt: "2025-02-04T12:19:11.247Z"
}

export interface ICategoriesInitialState {
  categories: ICategory[]; // ICategory bitra object aauxa jasma mati ko  field haru aauxa and store it in array hai
  status: Status;
}

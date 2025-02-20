import Categories from "@/app/admin/categories/page";
import { createSlice } from "@reduxjs/toolkit";
import { Status, ICategory, ICategoriesInitialState } from "./types";

export const datas: ICategoriesInitialState = {
  categories: [],
  status: Status.Loading,
};

const categorySlice = createSlice({
  // return object i.e createSlice bata and categoerSlice var ma tyo object ma different key value pair hunxa and tesma yata action banera ni aauxa {action: "dfa12312g9"}
  name: "category",
  initialState: datas,
  reducers: {
    setCategories(state, action) {
      state.status = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

// const {setCategories, setStatus} = categorySlice.actions.setCategories
// const {setCategories, setStatus} = categorySlice.actions.setStatus

const { setCategories, setStatus } = categorySlice.actions;
export default categorySlice.reducer; // reducers pural ma lakda error aaxuxa so singular reducer

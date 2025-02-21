import Categories from "@/app/admin/categories/page";
import { createSlice } from "@reduxjs/toolkit";
import { Status, ICategory, ICategoriesInitialState } from "./types";
import axios from "axios";
import { AppDispatch } from "../store";

export const datas: ICategoriesInitialState = {
  categories: [],
  status: Status.Loading,
};

const categorySlice = createSlice({
  // return object i.e createSlice bata and categoerSlice var ma tyo object ma different key value pair hunxa and tesma yata action banera ni aauxa {action: "dfa12312g9"}
  name: "category",
  initialState: datas,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

// const {setCategories, setStatus} = categorySlice.actions.setCategories
// const {setCategories, setStatus} = categorySlice.actions.setStatus

const { setCategories, setStatus } = categorySlice.actions;
export default categorySlice.reducer; // reducers pural ma lakda error aaxuxa so singular reducer

export function fetchCategories() {
  return async function fetchCategoriesThunk(dispatch: AppDispatch) {
    try {
      const response = await axios.get("http://localhost:3000/api/category");
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(setCategories(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

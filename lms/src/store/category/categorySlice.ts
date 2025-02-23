import Categories from "@/app/admin/categories/page";
import { createSlice } from "@reduxjs/toolkit";
import { Status, ICategory, ICategoriesInitialState } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";
import { actionAsyncStorage } from "next/dist/server/app-render/action-async-storage.external";

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
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    resetStatus(state) {
      state.status = Status.Loading;
    },
    deleteCategoryByIndex(state, action) {
      const index = state.categories.findIndex(
        (category) => category._id == action.payload
      );
      if (index !== -1) {
        state.categories.splice(index, 1);
      }
    },
  },
});

// const {setCategories, setStatus} = categorySlice.actions.setCategories
// const {setCategories, setStatus} = categorySlice.actions.setStatus

export const {
  setCategories,
  setStatus,
  resetStatus,
  addCategory,
  deleteCategoryByIndex,
} = categorySlice.actions;

export default categorySlice.reducer; // reducers pural ma lakda error aaxuxa so singular reducer

export function fetchCategories() {
  return async function fetchCategoriesThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/category");

      // axios ma response === ok garna mildaina hai just we can do in fetch ma matra
      if (response.status === 200) {
        // no need to update status here in fetch garda dispatch(setStatus(Status.Success));
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

export function createCategory(data: { name: string; description: string }) {
  return async function createCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/category", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.Success));
        dispatch(addCategory(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function deleteCategory(id: string) {
  return async function deleteCategoryThunk(dispatch: AppDispatch) {
    try {
      const response = await API.delete("/category/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.Success));
        dispatch(deleteCategoryByIndex(id));
        // dispatch(deleteCategoryByIndex(response.data.data._id)) garda ni hunxa
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      dispatch(setStatus(Status.Error));
    }
  };
}

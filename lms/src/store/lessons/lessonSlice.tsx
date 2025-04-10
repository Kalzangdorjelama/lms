import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../category/types";
import { IInitialData, Ilesson, ILessonForData } from "./types";
import { AppDispatch } from "../store";
import API from "@/http";

const data: IInitialData = {
  lessons: [],
  status: Status.Loading,
};

const lessonSlice = createSlice({
  name: "lessons",
  initialState: data,
  reducers: {
    setStatus(state: IInitialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setLessons(state: IInitialData, action: PayloadAction<Ilesson[]>) {
      state.lessons = action.payload;
    },
    pushToLessons(state: IInitialData, action: PayloadAction<Ilesson>) {
      state.lessons.push(action.payload);
    },
    resetStatus(state) {
      state.status = Status.Loading;
    },
    deleteLessonByIndex(state: IInitialData, action: PayloadAction<string>) {
      const index = state.lessons.findIndex(
        (lesson) => lesson._id == action.payload
      );
      if (index !== -1) {
        state.lessons.splice(index, 1);
      }
    },
  },
});

export const {
  setStatus,
  setLessons,
  pushToLessons,
  resetStatus,
  deleteLessonByIndex,
} = lessonSlice.actions;

export default lessonSlice.reducer;

export function fetchLessons(id: string) {
  return async function fetchLessonsThunk(dispatch: AppDispatch) {
    try {
      const response = await API.get("/lesson", { courseId: id });
      if (response.status == 200) {
        dispatch(setLessons(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function createLesson(data: ILessonForData) {
  return async function createCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.post("/lesson", data);
      if (response.status == 201) {
        dispatch(setStatus(Status.Success));
        dispatch(pushToLessons(response.data.data));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

export function deleteLesson(id: string) {
  return async function deleteCourseThunk(dispatch: AppDispatch) {
    try {
      const response = await API.delete("/lesson/" + id);
      if (response.status == 200) {
        dispatch(setStatus(Status.Success));
        dispatch(deleteLessonByIndex(id));
      } else {
        dispatch(setStatus(Status.Error));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.Error));
    }
  };
}

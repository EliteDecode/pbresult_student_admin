import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mgtService from "./managementService";
import { createAsyncThunkWithHandler } from "../api";

const subjects = JSON.parse(localStorage.getItem("pbSchoolStudentSubjects"));
const subjectsOffered = JSON.parse(
  localStorage.getItem("pbSchoolStudentOfferedSubjects")
);
const terms = JSON.parse(localStorage.getItem("pbSchoolStudentTerms"));

const initialState = {
  subjects: null,
  subjectsOffered: null,
  terms: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getSubjects = createAsyncThunkWithHandler(
  "mgt/getSubjects",
  async (classId, thunkAPI) => {
    const token = thunkAPI.getState().pbStudentAuth.token;
    return await mgtService.getSubjects(token, classId);
  }
);

export const getSubjectsOffered = createAsyncThunkWithHandler(
  "mgt/getSubjectsOffered",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().pbStudentAuth.token;
    return await mgtService.getSubjectsOffered(token, data);
  }
);

export const addSubjectsOffered = createAsyncThunkWithHandler(
  "mgt/addSubjectsOffered",
  async (subjects, thunkAPI) => {
    const token = thunkAPI.getState().pbStudentAuth.token;
    return await mgtService.addSubjectsOffered(token, subjects);
  }
);

export const updateSubjectsOffered = createAsyncThunkWithHandler(
  "mgt/updateSubjectsOffered",
  async (subjects, thunkAPI) => {
    const token = thunkAPI.getState().pbStudentAuth.token;
    return await mgtService.updateSubjectsOffered(token, subjects);
  }
);

export const getTerms = createAsyncThunkWithHandler(
  "mgt/getTerms",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().pbStudentAuth.token;
    return await mgtService.getTerms(token);
  }
);

const mgtSlice = createSlice({
  name: "mgt",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.subjects = action.payload;
      })
      .addCase(getSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(addSubjectsOffered.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSubjectsOffered.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "subject offered added successfully";
      })
      .addCase(addSubjectsOffered.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(updateSubjectsOffered.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubjectsOffered.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updateSubjectsOffered.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getTerms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTerms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.terms = action.payload;
      })
      .addCase(getTerms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })
      .addCase(getSubjectsOffered.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubjectsOffered.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.subjectsOffered = action.payload;
      })
      .addCase(getSubjectsOffered.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = mgtSlice.actions;
export default mgtSlice.reducer;

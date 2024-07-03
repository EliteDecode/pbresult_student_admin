import { createSlice } from "@reduxjs/toolkit";
import gradeService from "./gradeService";
import { createAsyncThunkWithHandler } from "../api";

const singleStudentResult = JSON.parse(
  localStorage.getItem("pbSchoolSingleStudentResult")
);

const initialState = {
  singleStudentResult: singleStudentResult ? singleStudentResult : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getStudentResult = createAsyncThunkWithHandler(
  "grade/getStudentResult",
  async (data, thunkAPI) => {
    const token = thunkAPI.getState().pbStudentAuth.token;
    return await gradeService.getStudentResult(token, data);
  }
);

const gradeSlice = createSlice({
  name: "grade",
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

      .addCase(getStudentResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleStudentResult = action.payload;
      })
      .addCase(getStudentResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { reset } = gradeSlice.actions;
export default gradeSlice.reducer;

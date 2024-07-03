import authSlice from "@/features/auth/authSlice";
import gradeSlice from "@/features/grade/gradeSlice";
import managementSlice from "@/features/management/managementSlice";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    pbStudentAuth: authSlice,
    mgt: managementSlice,
    grade: gradeSlice,
  },
});

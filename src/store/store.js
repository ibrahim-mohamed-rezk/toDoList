import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/auth/loginSlice";
import projectsSlice from "./slices/projects/projectsSlice";

export const store = configureStore({
  reducer: {
    user: loginSlice,
    projects: projectsSlice,
  },
});

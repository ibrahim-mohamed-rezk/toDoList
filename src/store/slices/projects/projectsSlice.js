import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

const initialState = {
  projects: [],
  project: null,
  status: "idle", // Added status to handle loading state
  error: null,
};

// Utility function to convert Firestore timestamps to formatted date strings
const convertTimestamps = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof Timestamp) {
      data[key] = data[key].toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    if (Array.isArray(data[key])) {
      data[key] = data[key].map((item) => {
        if (item.createdAt instanceof Timestamp) {
          return {
            ...item,
            createdAt: item.createdAt.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            updatedAt: item.updatedAt.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          };
        }
        return item;
      });
    }
  });
  return data;
};

// Fetch multiple projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (userId) => {
    const projectsRef = collection(db, `users/${userId}/projects`);
    const q = query(projectsRef, orderBy("updatedAt", "desc"));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const projects = querySnapshot.docs.map((doc) =>
        convertTimestamps({ id: doc.id, ...doc.data() })
      );
      return projects;
    } else {
      throw new Error("No projects found!");
    }
  }
);

// Fetch a single project
export const fetchProject = createAsyncThunk(
  "projects/fetchProject",
  async ({userId, projectId}) => {
    const projectRef = doc(db, `users/${userId}/projects/${projectId}`);
    const docSnapshot = await getDoc(projectRef);

    if (docSnapshot.exists()) {
      return convertTimestamps({ id: docSnapshot.id, ...docSnapshot.data() });
    } else {
      throw new Error("Project not found!");
    }
  }
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(fetchProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.project = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default projectsSlice.reducer;

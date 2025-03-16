import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  name: "",
  email: "",
  token: "",
  id: "",
  image: "",
  emailVerified: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { name, email, token, id, image, emailVerified } = action.payload;

      state.user = true;
      state.name = name;
      state.email = email;
      state.token = token;
      state.id = id;
      state.image = image;
      state.emailVerified = emailVerified;

      // Store user details in localStorage
      localStorage.setItem(
        "toDoUser",
        JSON.stringify({ name, email, token, id, image, emailVerified })
      );
    },

    checkUser: (state) => {
      const userData = localStorage.getItem("toDoUser");
      if (userData) {
        const { name, email, token, id, image, emailVerified } =
          JSON.parse(userData);
        state.user = true;
        state.name = name;
        state.email = email;
        state.token = token;
        state.id = id;
        state.image = image;
        state.emailVerified = emailVerified;
      }
    },

    logout: (state) => {
      localStorage.removeItem("toDoUser");
      state.user = false;
      state.name = "";
      state.email = "";
      state.token = "";
      state.id = "";
      state.image = "";
      state.emailVerified = false;
    },
  },
});

export const { setLogin, checkUser, logout } = loginSlice.actions;

export default loginSlice.reducer;

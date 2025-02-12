import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  userName: string;
  email: string;
  profilePicture: string;
}

interface Stat {

  stat : boolean

}

interface UserState {
  currentUser: User | null;
  stat : Stat
}

const initialState: UserState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : {
      currentUser: null,
      stat: { stat: false }
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(state));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user");
    },

    status: (state, action: PayloadAction<boolean>) => {
      state.stat = { stat: action.payload };
    },
  },
});

export const { login, logout,status } = userSlice.actions;
export default userSlice.reducer;

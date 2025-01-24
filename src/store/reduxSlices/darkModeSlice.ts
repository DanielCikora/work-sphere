import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface DarkModeState {
  isDarkMode: boolean;
}
const initialState: DarkModeState = {
  isDarkMode: false,
};
const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("darkMode", state.isDarkMode.toString());
      if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
      localStorage.setItem("darkMode", action.payload.toString());
      if (action.payload) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});
export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;

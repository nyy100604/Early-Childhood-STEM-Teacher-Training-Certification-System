import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShowBlackBgState {
  isShow: boolean;
}

const initialState: ShowBlackBgState = {
  isShow: false,
};

export const ShowBlackBgSlice = createSlice({
  name: "showBlackBg",
  initialState,
  reducers: {
    showBlackBg: (state) => {
      state.isShow = !state.isShow;
    },
    initialShowBlackBg: (state) => {
      state.isShow = false;
    },
  },
});

export const { showBlackBg, initialShowBlackBg } = ShowBlackBgSlice.actions;

export default ShowBlackBgSlice.reducer;

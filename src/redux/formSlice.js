import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    subject: "",
  },
  reducers: {
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
  },
});

export const { setSubject } = formSlice.actions;
export default formSlice.reducer;

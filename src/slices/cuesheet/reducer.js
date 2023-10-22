import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  content: [],
  error: {},
};

const cuesheetSlice = createSlice({
  name: "cuesheet",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getCuesheets.fulfilled, (state, action) => {
      state.getCuesheets = action.payload.data;
    });

    builder.addCase(getCuesheets.rejected, (state, action) => {
      state.error = action.payload.error || null;
    });
  },
});

export default cuesheetSlice.reducer;

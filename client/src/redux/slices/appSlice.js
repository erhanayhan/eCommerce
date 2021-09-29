import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    product: [],

  },
  reducers: {
    setProduct: (state, action) => {
      // console.log(action.payload);
      state.product = action.payload;
    },
  },
});

export const { setProduct } = appSlice.actions;
export const selectProduct = (state) => state.app.product;

// ----------------------------------------------------------
export default appSlice.reducer;

// store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  count: number;
  isOpen: boolean;
}

const initialState: CartState = {
  count: 0, // initial item in cart state to 0
  isOpen: false, // initial cart visibility state
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload; // sets redux count state
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen; // toggle isOpen state
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload; // optional (for direct control), use if needed
    },
  },
});

export const { setCartCount, toggleCart, setCartOpen } = cartSlice.actions;

export default cartSlice.reducer;

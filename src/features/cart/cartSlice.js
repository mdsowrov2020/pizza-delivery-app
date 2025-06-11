import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart(state, action) {
      if (!state.cart.length) {
        state.cart.push(action.payload);
      } else {
        const item = state.cart.find(
          (item) => item.pizzaId === action.payload.pizzaId
        );

        if (item) {
          item.quantity++;
        } else {
          state.cart.push(action.payload);
        }
      }
    },
    deleteCart(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0)
        return cartSlice.caseReducers.deleteCart(state, action);
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addCart,
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
  toggleCartSlider,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartItem = (state) => state.cart.cart.length;

export const getTotalCartItemPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

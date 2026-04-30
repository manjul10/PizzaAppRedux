import { configureStore } from "@reduxjs/toolkit";
import  CartReducer  from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice"
const store = configureStore({
  reducer: {
cart: CartReducer,
user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

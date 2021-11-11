import { configureStore } from "@reduxjs/toolkit";
import groceryReducer from "./groceryReducer";

const store = configureStore({
  reducer: { grocery: groceryReducer },
});

export default store;

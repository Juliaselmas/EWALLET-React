import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../redux/cardSlice";

let store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});

export default store;

import todosReducer from "./reducers/todosSlice";
import { configureStore } from "@reduxjs/toolkit";

//Store
const store = configureStore({
  reducer: {
    todosReducer,
  },
});

// Export store
export default store;

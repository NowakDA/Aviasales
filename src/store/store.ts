import { configureStore } from "@reduxjs/toolkit";

import apiReducer from "./apiSlice";
import ticketReducer from "./ticketsSlice";

export const store = configureStore({
  reducer: {
    filter: ticketReducer,
    tickets: apiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

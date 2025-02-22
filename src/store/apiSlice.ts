import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../utils/API";

export interface Ticket {
  price: number;
  carrier: string;
  segments: {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
  }[];
}

interface ApiState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  searchId: string | null;
}

const initialState: ApiState = {
  tickets: [],
  loading: false,
  error: null,
  searchId: null,
};

export const fetchSearchId = createAsyncThunk("api/fetchSearchId", async () => {
  const response = await api.get<{ searchId: string }>("/search");
  return response.data.searchId;
});

export const fetchTickets = createAsyncThunk(
  "api/fetchTickets",
  async (searchId: string, { dispatch }) => {
    let stop = false;
    while (!stop) {
      try {
        const response = await api.get<{ tickets: Ticket[]; stop: boolean }>(
          `/tickets?searchId=${searchId}`,
        );

        dispatch(addTickets(response.data.tickets));
        stop = response.data.stop;
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Ошибка загрузки пачки билетов:", error);
        }
      }
    }
  },
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    addTickets: (state, action) => {
      state.tickets.push(...action.payload);
    },
    setSearchId: (state, action) => {
      state.searchId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки билетов";
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      });
  },
});

export const { addTickets, setSearchId } = apiSlice.actions;
export default apiSlice.reducer;

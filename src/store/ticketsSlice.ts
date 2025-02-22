import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";

import { RootState } from "./store";

type SorterType = "cheapest" | "fastest" | "optimal";

interface TicketState {
  selectedSorter: SorterType;
  visibleTickets: number;
  selectedTransfers: number[];
}

const allTransfers = [0, 1, 2, 3];

const initialState: TicketState = {
  selectedSorter: "cheapest",
  visibleTickets: 5,
  selectedTransfers: [...allTransfers], 
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSorter: (state, action: PayloadAction<SorterType>) => {
      state.selectedSorter = action.payload;
    },

    showMoreTickets: (state) => {
      state.visibleTickets += 5;
    },


    // CHECKBOX
    toggleTransfer: (state, action: PayloadAction<number>) => {
      const value = action.payload;
    
      if (value === -1) {

        state.selectedTransfers = state.selectedTransfers.length === allTransfers.length ? [] : [...allTransfers];
      } else {

        if (state.selectedTransfers.includes(value)) {
          state.selectedTransfers = state.selectedTransfers.filter((t) => t !== value);
        } else {
          state.selectedTransfers.push(value);
        }
    

        if (state.selectedTransfers.length === allTransfers.length) {
          state.selectedTransfers = [...allTransfers];
        } else if (state.selectedTransfers.length === 0) {
          state.selectedTransfers = []; 
        }
      }
    }
  },
});

export const { setSorter, showMoreTickets, toggleTransfer } = ticketSlice.actions;
export default ticketSlice.reducer;

// FILTER
export const selectFilteredTickets = createSelector(
  [(state: RootState) => state.tickets.tickets, (state: RootState) => state.filter.selectedTransfers],
  (tickets, selectedTransfers) => {
    if (selectedTransfers.length === 0) return [];
    return tickets.filter((ticket) =>
    selectedTransfers.some((stops) =>
    (ticket.segments[0].stops.length === stops && ticket.segments[1].stops.length <= stops) ||
    (ticket.segments[1].stops.length === stops && ticket.segments[0].stops.length <= stops)
      )
    );
  }
);

// SORTER
export const selectSortedTickets = createSelector(
  [selectFilteredTickets, (state: RootState) => state.filter.selectedSorter],
  (filteredTickets, selectedSorter) => {
    return [...filteredTickets].sort((a, b) => {
      if (selectedSorter === "cheapest") return a.price - b.price;
      if (selectedSorter === "fastest") return (a.segments[0].duration+a.segments[1].duration) - (b.segments[0].duration+b.segments[1].duration);
      return (a.price + a.segments[0].duration+a.segments[1].duration) - (b.price + b.segments[0].duration+b.segments[1].duration);
    });
  }
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { BookItem, OrderBook } from '../types';

export interface BookState {
  asks: Array<BookItem>;
  bids: Array<BookItem>;
  status: string;
}


const initialState: BookState = {
  asks: [],
  bids: [],
  status: 'idle',
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateBook: (state, action: PayloadAction<OrderBook>) => {
      state.asks = action.payload.asks;
      state.bids = action.payload.bids;
      state.status = 'running'
    },
    updateStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { updateBook, updateStatus } = bookSlice.actions;

export const orderBookState = (state: RootState) => state.orderbook;


export default bookSlice.reducer;

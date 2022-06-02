import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ordebookReducer from '../reducers/ordebook';

export const store = configureStore({
  reducer: {
    orderbook: ordebookReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

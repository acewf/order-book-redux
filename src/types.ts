import { MouseEventHandler } from 'react';

export type BookItem = {
  price: number;
  size: number;
  total: number;
}

export interface OrderBook {
  asks: Array<BookItem>;
  bids: Array<BookItem>;
}

export interface IBook extends OrderBook {
  onClick: MouseEventHandler;
}

export interface BooksList {
  entries: Array<BookItem>;
  maxTotal: number;
  isAsks: boolean;
}

export type Message = {
  show: boolean;
  info?: string;
}

export interface IMessage extends Message {
  onClick: MouseEventHandler;
}

export type MessageStruct = {
  event: string,
  channel: string,
  uri: string,
}

export type WsMessage = {
  event: string;
  channel: string;
  symbol: string;
}

export type RawResponse = {
  productId: number;
  bookData: number[][];
}


export type WorkerIncomeMessage = {
  type: string;
  uri: string,
  product: string;
}

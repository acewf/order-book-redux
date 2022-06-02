import type { OrderBook, MessageStruct } from './types';

export const WS_URI = 'wss://api-pub.bitfinex.com/ws/2';
export const SUBSCRIBED_EVENT: string = 'subscribed';
export const SUBSCRIBE_EVENT: string = 'subscribe';
export const BOOK_UPDATE: string = 'book_update';
export const BOOK_SNAPSHOT: string = 'book_snapshot';


export const CLOSED_CONNECTION: string = 'closed';
export const ERROR_CONNECTION: string = 'error';

export const START: string = 'start';

export const EMPTY_BOOK: OrderBook = {
  asks: [],
  bids: [],
}

export const BTC_MESSAGE: MessageStruct = {
  uri: WS_URI,
  event: "subscribe",
  channel: "BTC"
}

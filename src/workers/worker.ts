import Socket from './SocketConnector'
import {
  BookItem, OrderBook,
  WorkerIncomeMessage,
  RawResponse
} from '../types';
import {
  BOOK_SNAPSHOT, BOOK_UPDATE,
  EMPTY_BOOK
} from '../constants'
import { bookConverter, bookUpdater } from './helper';

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as unknown as Worker;
let connection: Socket;
let bookInstance: OrderBook = EMPTY_BOOK;

function processMessages(data: RawResponse): OrderBook {
  let asks: Array<BookItem> = bookInstance.asks || [];
  let bids: Array<BookItem> = bookInstance.bids || [];


  const type = data.bookData.length > 3 ? BOOK_SNAPSHOT : BOOK_UPDATE;
  const bidslist = data.bookData.filter(([, , amount]) => amount > 0)
  const askslist = data.bookData.filter(([, , amount]) => amount <= 0)

  switch (type) {
    case BOOK_SNAPSHOT:
      asks = bookConverter(askslist, true);
      bids = bookConverter(bidslist, false);

      break;
    case BOOK_UPDATE:
      asks = bookUpdater(asks, askslist, true)
      bids = bookUpdater(bids, bidslist, false)
      break;

    default:
      break;
  }

  return {
    asks,
    bids,
  };
}

function onMessage(ev: MessageEvent): void {
  const data = JSON.parse(ev.data);
  if (data.event) {

  } else {
    const [channelID, bookData] = data;
    const isArray = Array.isArray(bookData);
    if (!isArray) {
      return;
    }

    const precessedBook: OrderBook = processMessages({
      productId: channelID,
      bookData: bookData.length > 3 ? bookData : [bookData]
    });

    bookInstance = precessedBook;
    postMessage(precessedBook);

  }
}

ctx.addEventListener('message', ({ data = {} }: MessageEvent) => {
  const { uri }: WorkerIncomeMessage = data;
  bookInstance = EMPTY_BOOK;
  connection = new Socket(uri, {
    event: 'subscribe',
    channel: 'book',
    symbol: 'tBTCUSD',
  })
  connection.addEventListener('message', onMessage);
});

export default ctx;

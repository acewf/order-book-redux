
import type { BookItem } from '../../types';

type InfoProps = {
  asks: Array<BookItem>;
  bids: Array<BookItem>;
}

const bookLength: number = 16;

export const getBookInfo = ({ asks, bids }: InfoProps) => {
  const shortAsks: Array<BookItem> = asks.slice(0, bookLength);
  const shortBids: Array<BookItem> = bids.slice(0, bookLength);
  const sizeBids = shortBids.reduce((acc, { size }) => { return acc + size }, 0);
  const sizeAsk = shortAsks.reduce((acc, { size }) => { return acc + size }, 0);

  const maxTotal: number = Math.max(sizeAsk || 0, sizeBids || 0);

  return {
    shortAsks,
    shortBids,
    maxTotal
  }
}

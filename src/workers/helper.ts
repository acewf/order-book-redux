import type { BookItem } from '../types';

function sort(entries: Array<BookItem>, asc: boolean): Array<BookItem> {
  const sortEntries = entries.sort((a, b) => {
    if (asc) {
      return Math.round(a.price - b.price)
    }
    return Math.round(b.price - a.price)
  });

  return sortEntries;
}

export function bookConverter(data: number[][], asc: boolean): Array<BookItem> {
  const entries = data.map(([price, size, amount]) => {
    const entry: BookItem = {
      price,
      size,
      total: amount
    }
    return entry;
  });

  return sort(entries, asc);
}

export function bookUpdater(entries: Array<BookItem>, data: number[][], asc: boolean): Array<BookItem> {
  const newEntries = [...entries];
  data.forEach(([price, newSize, amount]) => {
    const entryIndex = newEntries.findIndex((entry) => (entry.price === price));
    if (Boolean(~entryIndex)) {
      newEntries[entryIndex].size = newSize;
    } else {
      const entry: BookItem = {
        price,
        size: newSize,
        total: amount
      }
      newEntries.push(entry)
    }
  })

  const filteredEntries = newEntries.filter(({ size }) => size > 0);
  return sort(filteredEntries, asc);
}

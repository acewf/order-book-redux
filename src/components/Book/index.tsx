import { FC } from 'react';
import type { OrderBook } from '../../types';
import ColumnsTitles from './ColumnsTitles';
import PriceList from '../PriceList';
import { getBookInfo } from './dataHelper';


const Book: FC<OrderBook> = ({ asks, bids }) => {

  const { maxTotal, shortAsks, shortBids } = getBookInfo({ asks, bids });

  return (
    <div className="bg-blueish border border-gray-600 text-gray-600">
      <div className="w-full min-h-[300px]">
        <div className="flex flex-col md:flex-row-reverse">
          <div className="h-auto md:h-full w-full overflow-hidden">
            <ColumnsTitles isAsks={true} />
            <PriceList maxTotal={maxTotal} entries={shortAsks} isAsks={true} />
          </div>
          <div className="h-auto md:h-fullnp w-full overflow-hidden">
            <div className="hidden md:flex">
              <ColumnsTitles isAsks={false} />
            </div>
            <PriceList maxTotal={maxTotal} entries={shortBids} isAsks={false} />
          </div>
        </div>
      </div>
    </div >
  );
}

export default Book

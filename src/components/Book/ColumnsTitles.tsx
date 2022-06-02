import { FC } from 'react';

export interface iProps {
  isAsks: boolean;
}
const ColumnsTitles: FC<iProps> = ({ isAsks }) => {
  const flowRow = isAsks ? 'flex-row' : 'flex-row-reverse'
  return (
    <div className={`${flowRow} w-full justify-around border-b border-gray-700 text-right hidden md:flex`}>
      <span className="w-1/3">Price</span>
      <span className="w-1/3">Count</span>
      <span className="w-1/3 mr-4">Total</span>
    </div>
  );
}

export default ColumnsTitles;

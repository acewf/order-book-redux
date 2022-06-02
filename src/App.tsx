import './App.css';

import { useAppSelector } from './app/hooks';
import {
  orderBookState
} from './reducers/ordebook';

import {
  CLOSED_CONNECTION, ERROR_CONNECTION, BTC_MESSAGE
} from './constants';


import Book from './components/Book';
import Warning from './components/Warning';
import useWorker from './hooks/useWorker';

function App() {
  const state = useAppSelector(orderBookState);
  const { ref } = useWorker()

  const resumeRender = () => {
    ref?.postMessage(BTC_MESSAGE);
  }

  return (
    <div className="bg-black w-full min-h-screen">
      <header className="">
        <h1>Order Book</h1>
      </header>
      <main className='w-full max-w-5xl mx-auto'>
        <Book bids={state.bids} asks={state.asks} />
        <Warning
          show={state.status === CLOSED_CONNECTION || state.status === ERROR_CONNECTION}
          info="something went wrong, click to resume"
          onClick={resumeRender} />
      </main>
    </div>
  );
}

export default App;

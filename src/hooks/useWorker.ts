import { useRef, useEffect } from 'react';

import {
  updateBook, updateStatus
} from '../reducers/ordebook';
import { useAppDispatch } from '../app/hooks';
import type { OrderBook } from '../types';
import {
  CLOSED_CONNECTION, ERROR_CONNECTION,
  SUBSCRIBED_EVENT,
  BTC_MESSAGE
} from '../constants';

const useWorker = () => {
  const workerRef = useRef<Worker>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const onMessage = ({ data }: MessageEvent) => {
      switch (data.event) {
        case CLOSED_CONNECTION:
          dispatch(updateStatus(CLOSED_CONNECTION))

          break;
        case ERROR_CONNECTION:
          dispatch(updateStatus(ERROR_CONNECTION))

          break;
        case SUBSCRIBED_EVENT:

          break;

        default:
          const newBook: OrderBook = data;
          dispatch(updateBook(newBook))
          break;
      }
    }

    workerRef.current = new Worker(new URL('../workers/worker.ts', import.meta.url));
    workerRef.current.addEventListener('message', onMessage);
    workerRef.current.postMessage(BTC_MESSAGE);

    return () => {
      if (workerRef.current) {
        workerRef.current.removeEventListener('message', onMessage);
        workerRef.current.terminate()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ref: workerRef.current
  }
}

export default useWorker;

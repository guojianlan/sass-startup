import { useEffect, useState } from 'react';

export const useCountDown = () => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    let timer: any;
    if (count > 0) {
      timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [count]);
  return {
    count,
    setCount,
  };
};

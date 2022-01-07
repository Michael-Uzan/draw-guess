import { useState, useEffect, useRef } from "react";

interface PropType {
  targetTime: Date | number | any,
  dueFunc: Function
}

export const CountDown = (props: PropType) => {
  const [minsRemaining, setMinsRemainig] = useState<number | string>(0);
  const [secsRemaining, setsecsRemaining] = useState<number | string>(0);
  const intervalId: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      countDown();
      checkIfTimeOver(new Date(props.targetTime - Date.now()));
    }, 500);
    return () => {
      clearInterval(intervalId.current as NodeJS.Timeout);
    };
  }, []);

  const countDown = () => {
    const msRemainig: Date = new Date(props.targetTime - Date.now());
    const minsRemaining: number | string = getFullDigits(msRemainig.getMinutes());
    const secsRemaining: number | string = getFullDigits(msRemainig.getSeconds());

    setMinsRemainig(minsRemaining);
    setsecsRemaining(secsRemaining);
  };

  const checkIfTimeOver = (ms: number | Date) => {
    if (ms <= 500) {
      clearInterval(intervalId.current as NodeJS.Timeout);
      props.dueFunc();
    }
  };

  const getFullDigits = (remainingTime: number) => {
    return remainingTime >= 10 ? remainingTime : "0" + remainingTime;
  };

  if (!minsRemaining || !secsRemaining) return <></>

  return (
    <div className="count-down">
      <div className="count-down-box">
        <h3>
          {minsRemaining}:
          <span className={(secsRemaining <= 20 && minsRemaining < 1) ? "red" : ""}>
            {secsRemaining}
          </span>
        </h3>
      </div>
    </div>
  );
};

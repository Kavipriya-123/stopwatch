import { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [millisecond, setMillisecond] = useState(0);
  const timerRef = useRef(null); // Store the interval ID

  const handleReset = () => {
    clearInterval(timerRef.current);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setMillisecond(0);
  };

  const handleStart = () => {
    if (timerRef.current) return; // Prevent multiple intervals

    timerRef.current = setInterval(() => {
      setMillisecond((prevMillisecond) => {
        if (prevMillisecond + 1 === 1000) {
          setSecond((prevSecond) => {
            if (prevSecond + 1 === 60) {
              setMinute((prevMinute) => {
                if (prevMinute + 1 === 60) {
                  setHour((prevHour) => prevHour + 1);
                  return 0;
                }
                return prevMinute + 1;
              });
              return 0;
            }
            return prevSecond + 1;
          });
          return 0;
        }
        return prevMillisecond + 1;
      });
    }, 1);
  };

  const handleStop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null; // Clear stored interval ID
  };

  return (
    <div className="stopwatch-cont">
      <h1>STOPWATCH</h1>
      <div>
        <ul className="time-cont">
          <li>{hour}</li>
          <li>:</li>
          <li>{minute}</li>
          <li>:</li>
          <li>{second}</li>
          <li>:</li>
          <li>{millisecond}</li>
        </ul>
        <ul className="btn-cont">
          <li>
            <button type="button" className="btn-style reset" onClick={handleReset}>
              Reset
            </button>
          </li>
          <li>
            <button type="button" className="btn-style stop" onClick={handleStop}>
              Stop
            </button>
          </li>
          <li>
            <button type="button" className="btn-style start" onClick={handleStart}>
              Start
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;

import { useEffect, useState } from 'react';
import { formatTime } from '../utils/formatTime.js';

// LAB 2 (Slide 10): Timer Start / Stop / Reset
export default function Lab2TimerControl() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // running이 false면 타이머를 만들지 않음
    if (!running) return;

    console.log('[LAB 2] effect: timer start');
    const timerId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // running이 바뀌기 전(Stop/Reset) 또는 언마운트 시 이전 타이머 정리
    return () => {
      clearInterval(timerId);
      console.log('[LAB 2] cleanup: timer cleared');
    };
  }, [running]);

  const reset = () => {
    setRunning(false); // running이 false로 바뀌면 Cleanup이 실행되어 타이머 중지
    setCount(0);
  };

  return (
    <div>
      <p className={running ? 'status running' : 'status'}>상태: {running ? 'Running' : 'Stopped'}</p>
      <div className="count">{count}</div>
      <p className="time">{formatTime(count)}</p>
      <div className="controls">
        <button onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button className="secondary" onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
      <p className="hint">Start/Stop 버튼의 State 변경과 Effect 실행의 관계를 확인하세요.</p>
    </div>
  );
}

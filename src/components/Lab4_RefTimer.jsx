import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../utils/formatTime.js';

// LAB 4 (Slide 17): Timer ID를 useRef로 관리
export default function Lab4RefTimer() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  // 타이머 ID 저장용 Ref (값이 바뀌어도 리렌더링 X, 렌더링 사이에 유지됨)
  const timerRef = useRef(null);

  const start = () => {
    // 이미 타이머가 있으면 중복 시작 방지
    if (timerRef.current !== null) return;

    timerRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
    setRunning(true);
    console.log('[LAB 4] start:', timerRef.current);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
    console.log('[LAB 4] stop');
  };

  const reset = () => {
    stop();
    setCount(0);
  };

  useEffect(() => {
    // 언마운트 시(다른 탭으로 이동) 남아 있는 Interval 정리
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        console.log('[LAB 4] cleanup: timer cleared on unmount');
      }
    };
  }, []);

  return (
    <div>
      <p className={running ? 'status running' : 'status'}>상태: {running ? 'Running' : 'Stopped'}</p>
      <div className="count">{count}</div>
      <p className="time">{formatTime(count)}</p>
      <div className="controls">
        <button onClick={start} disabled={running}>Start</button>
        <button className="secondary" onClick={stop} disabled={!running}>Stop</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
      <p className="hint">Timer ID와 화면 표시용 상태의 차이를 설명해 보세요.</p>
    </div>
  );
}

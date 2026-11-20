import { useEffect, useState } from 'react';

// LAB 1 (Slide 07): useEffect Timer
export default function Lab1EffectTimer() {
  const [count, setCount] = useState(0);
  console.log('[LAB 1] rendered');

  useEffect(() => {
    console.log('[LAB 1] effect: timer start');

    // 1초마다 이전 값(prev)을 기준으로 +1 (Functional State Update)
    const timerId = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // Cleanup: 언마운트될 때(다른 Lab 탭으로 이동) 타이머 정리
    return () => {
      clearInterval(timerId);
      console.log('[LAB 1] cleanup: timer cleared');
    };
  }, []); // [] → 마운트 시 한 번만 타이머 생성

  return (
    <div>
      <p className="hint">TODO를 완성하면 1초마다 자동으로 Count가 증가해야 합니다.</p>
      <div className="count">{count}</div>
      <p className="hint">Console에서 Render / Effect / Cleanup을 비교하세요.</p>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function PhClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const pht = new Intl.DateTimeFormat('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setTime(pht);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div id="ph-clock" title="Philippine Time (PHT)">
      <span className="text-mid text-[10px]">🇵🇭</span>
      <span className="font-mono text-deep" style={{ fontSize: '0.72rem' }}>{time}</span>
    </div>
  );
}

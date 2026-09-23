import React, { useEffect, useState } from 'react';
import GetMantras from './GetMantras';

export default function Shivji() {
  const [mantra, setMantra] = useState({
    deity: 'Shiv Ji',
    mantra: 'ॐ नमः शिवाय',
    meaning: 'Om Namah Shivaya - I bow to Shiva, the supreme auspicious consciousness within all creation.',
    benefits: 'Calms the mind, dissolves negative energy, and brings deep inner peace, clarity, and self-realization.',
  });

  useEffect(() => {
    async function getMantra() {
      try {
        const response = await fetch('https://dummyjson.com/c/5e12-20f8-4af5-a9fe');
        const data = await response.json();
        if (data && data.mantra) setMantra(data);
      } catch (err) {
        // Default fallback handles offline
      }
    }
    getMantra();
  }, []);

  return <GetMantras sendMantra={mantra} />;
}

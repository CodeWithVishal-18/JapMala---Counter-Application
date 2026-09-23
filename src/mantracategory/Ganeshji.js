import React, { useEffect, useState } from 'react';
import GetMantras from './GetMantras';

export default function Ganeshji() {
  const [mantra, setMantra] = useState({
    deity: 'Ganesh Ji',
    mantra: 'ॐ गं गणपतये नमः',
    meaning: 'Om Gam Ganapataye Namaha - Salutations to the Remover of all obstacles.',
    benefits: 'Brings wisdom, clarity, auspicious beginnings, and removes hurdles in spiritual and daily life.',
  });

  useEffect(() => {
    async function getMantra() {
      try {
        const response = await fetch('https://dummyjson.com/c/9c7e-4d28-4e88-a3b6');
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

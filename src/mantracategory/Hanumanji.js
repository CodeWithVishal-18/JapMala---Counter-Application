import React, { useEffect, useState } from 'react';
import GetMantras from './GetMantras';

export default function Hanumanji() {
  const [mantra, setMantra] = useState({
    deity: 'Hanuman Ji',
    mantra: 'ॐ हं हनुमते रुद्रात्मकाय हुं फट्',
    meaning: 'Salutations to Lord Hanuman, the embodiment of divine strength, unwavering devotion, and the remover of all afflictions.',
    benefits: 'Bestows courage, removes all fear, mental weaknesses, negative planetary influences, and protects the devotee from adversities.',
  });

  useEffect(() => {
    async function getMantra() {
      try {
        const response = await fetch('https://dummyjson.com/c/c599-6cdc-43e8-8d1c');
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

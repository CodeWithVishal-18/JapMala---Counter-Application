import React, { useEffect, useState } from 'react';
import GetMantras from './GetMantras';

export default function Vishnuji() {
  const [mantra, setMantra] = useState({
    deity: 'Vishnu Ji',
    mantra: 'ॐ नमो भगवते वासुदेवाय',
    meaning: 'Om Namo Bhagavate Vasudevaya - Salutations to the Supreme Lord Vasudeva who dwells in all beings.',
    benefits: 'Fosters spiritual liberation (Moksha), divine peace, protection, and boundless compassion.',
  });

  useEffect(() => {
    async function getMantra() {
      try {
        const response = await fetch('https://dummyjson.com/c/0ce3-d5d4-4da4-b886');
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

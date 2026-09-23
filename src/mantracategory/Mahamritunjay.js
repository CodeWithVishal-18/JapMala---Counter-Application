import React, { useEffect, useState } from 'react';
import GetMantras from './GetMantras';

export default function Mahamritunjay() {
  const [mantra, setMantra] = useState({
    deity: 'Mahamrityunjaya Jaap',
    mantra: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्',
    meaning: 'We revere the Three-Eyed Lord who is fragrant and nourishes all beings. As a ripe cucumber is gently liberated from its stem, may we be freed from fear and mortality into the nectar of immortality.',
    benefits: 'Bestows health, physical and mental vitality, relief from fear, protection against accidents, and deep spiritual rejuvenation.',
  });

  useEffect(() => {
    async function getMantra() {
      try {
        const response = await fetch('https://dummyjson.com/c/a810-f29e-4778-a424');
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

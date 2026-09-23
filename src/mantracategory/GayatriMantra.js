import React, { useEffect, useState } from 'react';
import GetMantras from './GetMantras';

export default function GayatriMantra() {
  const [mantra, setMantra] = useState({
    deity: 'Gayatri Mantra',
    mantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    meaning: 'We meditate upon the spiritual radiance of the divine Sun, the illuminator of the cosmos. May that light inspire and awaken our intellect.',
    benefits: 'Awakens higher spiritual consciousness, enhances mental clarity and memory, and dispels negativity.',
  });

  useEffect(() => {
    async function getMantra() {
      try {
        const response = await fetch('https://dummyjson.com/c/d1f4-c09b-4761-90d8');
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

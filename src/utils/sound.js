// Web Audio API Synthesizer for JapMala
// Generates realistic sacred temple bell, singing bowl harmonics, and tactile wooden bead clicks

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a resonant, rich temple bell (Ghanti) sound.
 * Ideal for completing a 108-bead Mala lap.
 */
export function playTempleBell() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonic frequencies simulating a traditional brass temple bell
    const baseFreq = 587.33; // D5 note
    const harmonics = [
      { freq: baseFreq, gain: 0.6, decay: 3.5 },
      { freq: baseFreq * 1.5, gain: 0.4, decay: 2.8 },
      { freq: baseFreq * 2.0, gain: 0.35, decay: 2.2 },
      { freq: baseFreq * 2.76, gain: 0.25, decay: 1.8 },
      { freq: baseFreq * 3.4, gain: 0.15, decay: 1.2 },
      { freq: baseFreq * 5.2, gain: 0.08, decay: 0.8 },
    ];

    harmonics.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Bell envelope: sharp strike attack, lingering harmonic ring
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.015);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
}

/**
 * Plays a subtle, tactile wooden bead click sound for individual bead counts.
 */
export function playBeadClick() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.04);

    gainNode.gain.setValueAtTime(0.25, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (err) {
    console.warn('Bead click audio error:', err);
  }
}

/**
 * Plays a triumphant sacred singing bowl / chime chord for session completion.
 */
export function playCelebrationChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Sacred chord: Om / Sa-Pa harmony (C#4, G#4, C#5)
    const chord = [277.18, 415.30, 554.37, 830.61];

    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gainNode.gain.setValueAtTime(0.001, now + idx * 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.2, now + idx * 0.08 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 2.6);
    });
  } catch (err) {
    console.warn('Celebration audio error:', err);
  }
}

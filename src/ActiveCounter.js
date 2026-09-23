import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Undo2,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Maximize2,
  Minimize2,
  Smartphone,
} from 'lucide-react';
import MalaBeadsVisual from './components/MalaBeadsVisual';
import MalaCompleteModal from './components/MalaCompleteModal';
import { playTempleBell, playBeadClick, playCelebrationChime } from './utils/sound';
import { saveActiveCounter, clearSavedActiveCounter, saveHistorySession } from './utils/storage';

export default function ActiveCounter({ counter, onSessionEnd, onBackToHome }) {
  const [current, setCurrent] = useState(counter?.current || 0);
  const [target, setTarget] = useState(counter?.target || 108);
  const [malasCompleted, setMalasCompleted] = useState(counter?.malasCompleted || 0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [sessionStartTime] = useState(counter?.startedAt || Date.now());
  const [isZenMode, setIsZenMode] = useState(false);
  const [tapEffect, setTapEffect] = useState(false);

  const title = counter?.title || 'Mantra Jaap';
  const isCompleted = current >= target;

  // Synchronize active counter state with localStorage
  useEffect(() => {
    saveActiveCounter({
      title,
      target,
      current,
      malasCompleted,
      startedAt: sessionStartTime,
    });
  }, [title, target, current, malasCompleted, sessionStartTime]);

  // Handle Mala / Target Completion trigger
  const triggerMalaLapCelebration = useCallback((newMalasCount) => {
    if (soundEnabled) {
      playTempleBell();
    }
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([150, 80, 150]);
      } catch (e) {
        // ignore if vibration blocked
      }
    }
    setShowCompleteModal(true);
  }, [soundEnabled]);

  // Main count increment (full-screen tap)
  const handleIncrement = useCallback(() => {
    // If target has already been reached, tapping will NOT affect the counter!
    if (current >= target) {
      return;
    }

    setIsAnimating(true);
    setTapEffect(true);
    setTimeout(() => setIsAnimating(false), 200);
    setTimeout(() => setTapEffect(false), 150);

    if (soundEnabled) {
      playBeadClick();
    }

    const nextCount = current + 1;
    setCurrent(nextCount);

    // Check if target is reached or 108-bead Mala lap is completed
    if (nextCount === target) {
      const finalMalas = target >= 108 ? Math.max(malasCompleted + 1, Math.floor(nextCount / 108)) : malasCompleted;
      setMalasCompleted(finalMalas);
      triggerMalaLapCelebration(finalMalas);
    } else if (nextCount % 108 === 0 && nextCount > 0) {
      const newMalas = malasCompleted + 1;
      setMalasCompleted(newMalas);
      triggerMalaLapCelebration(newMalas);
    }
  }, [current, target, malasCompleted, soundEnabled, triggerMalaLapCelebration]);

  // Handle undo (-1 count)
  const handleUndo = (e) => {
    e.stopPropagation();
    if (current > 0) {
      const prev = current - 1;
      setCurrent(prev);
      setMalasCompleted(Math.floor(prev / 108));
    }
  };

  // Handle reset
  const handleReset = (e) => {
    e.stopPropagation();
    if (window.confirm('Reset current chanting count back to zero?')) {
      setCurrent(0);
      setMalasCompleted(0);
    }
  };

  // Handle continuing to the next Mala or round
  const handleContinueNextMala = () => {
    setShowCompleteModal(false);
    // If target reached, expand target for the next round
    if (current >= target) {
      setTarget((prev) => prev + (prev <= 108 ? prev : 108));
    }
  };

  // Complete and save to history
  const handleFinishAndSave = (e) => {
    if (e) e.stopPropagation();
    const durationSeconds = (Date.now() - sessionStartTime) / 1000;
    const finalMalas = malasCompleted || Math.floor(current / 108);

    if (soundEnabled) {
      playCelebrationChime();
    }

    saveHistorySession({
      title,
      chants: current,
      malas: finalMalas,
      durationSeconds,
    });

    clearSavedActiveCounter();
    setShowCompleteModal(false);

    if (onSessionEnd) {
      onSessionEnd({
        title,
        chants: current,
        malas: finalMalas,
      });
    } else if (onBackToHome) {
      onBackToHome();
    }
  };

  // Keyboard navigation (Spacebar or Enter to chant)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        handleIncrement();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleIncrement]);

  // Current bead inside the visual ring
  const currentBeadInRing = target <= 108
    ? current
    : (current % 108 === 0 && current > 0 ? 108 : current % 108);

  return (
    <div
      className={`active-counter-fullscreen ${isZenMode ? 'zen-mode' : ''} ${tapEffect ? 'screen-tap-active' : ''} ${isCompleted ? 'counter-is-completed' : ''}`}
      onClick={handleIncrement}
      style={{ cursor: isCompleted ? 'default' : 'pointer' }}
    >
      {/* Top Controls Bar */}
      <div
        className="d-flex align-items-center justify-content-between px-3 py-3 w-100 top-control-bar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            if (current > 0) {
              if (window.confirm('Save your progress to Sadhana before leaving?')) {
                handleFinishAndSave();
                return;
              }
            }
            clearSavedActiveCounter();
            onBackToHome();
          }}
          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 rounded-pill px-3 shadow-xs"
          style={{ fontSize: '0.85rem', backgroundColor: '#FFFDF9' }}
        >
          <ArrowLeft size={16} />
          <span>Exit</span>
        </button>

        {/* Central Mantra Title & Status */}
        <div className="text-center px-2 flex-grow-1">
          <h4 className="fw-bold mb-0 text-truncate mx-auto" style={{ maxWidth: '240px', color: '#5A2E22' }}>
            {title}
          </h4>

          {isCompleted ? (
            <span
              className="badge rounded-pill mt-1 d-inline-flex align-items-center gap-1 shadow-xs"
              style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7', fontSize: '0.75rem' }}
            >
              <CheckCircle2 size={12} />
              <span>Target Reached • Chanting Complete</span>
            </span>
          ) : (
            <span className="badge rounded-pill bg-light text-muted border mt-1 d-inline-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
              <Smartphone size={11} color="#E65100" />
              <span>Tap anywhere on screen</span>
            </span>
          )}
        </div>

        {/* Top Action Icons */}
        <div className="d-flex align-items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="btn btn-sm btn-light border rounded-circle p-2 shadow-xs"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 size={17} color="#FF8F00" /> : <VolumeX size={17} color="#9E9E9E" />}
          </button>

          {/* Zen Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsZenMode(!isZenMode)}
            className="btn btn-sm btn-light border rounded-circle p-2 shadow-xs"
            title={isZenMode ? 'Exit Zen Mode' : 'Enter Zen Mode'}
          >
            {isZenMode ? <Minimize2 size={17} color="#5A2E22" /> : <Maximize2 size={17} color="#5A2E22" />}
          </button>
        </div>
      </div>

      {/* Middle Chanting Area - Centers dynamic Mala Beads */}
      <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center px-3 my-auto w-100">
        <div
          className="beads-wrapper-card w-100 d-flex flex-column align-items-center justify-content-center text-center py-2"
          style={{ maxWidth: '420px', pointerEvents: 'none' }}
        >
          {/* Visual Mala Beads Ring - Renders exact bead count (e.g. 10 beads if target is 10, or 108 if 108) */}
          <MalaBeadsVisual
            currentBead={currentBeadInRing}
            targetBeads={target}
            malasCompleted={malasCompleted}
            totalCurrent={current}
            isAnimating={isAnimating}
            isCompleted={isCompleted}
          />

          {/* Total Chants Indicator */}
          <div
            className="mt-3 d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill shadow-xs"
            style={{
              backgroundColor: isCompleted ? '#E8F5E9' : '#FFF3E0',
              border: `1px solid ${isCompleted ? '#A5D6A7' : '#FFCC80'}`,
            }}
          >
            {isCompleted ? (
              <CheckCircle2 size={14} color="#2E7D32" />
            ) : (
              <Sparkles size={14} color="#E65100" />
            )}
            <span
              style={{
                fontSize: '0.88rem',
                color: isCompleted ? '#2E7D32' : '#BF360C',
                fontWeight: '500',
              }}
            >
              {isCompleted ? (
                <>Completed: <strong>{current}</strong> / {target} chants</>
              ) : (
                <>Total Chants: <strong>{current}</strong> / {target}</>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Control Bar (Undo, Reset, Save) */}
      <div
        className="d-flex align-items-center justify-content-center gap-2 gap-sm-3 px-3 py-3 w-100 bottom-control-bar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleUndo}
          disabled={current === 0}
          className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 shadow-xs"
          style={{ fontSize: '0.85rem', backgroundColor: '#FFFDF9' }}
          title="Undo 1 count"
        >
          <Undo2 size={15} />
          <span>Undo</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={current === 0}
          className="btn btn-sm btn-outline-danger rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 shadow-xs"
          style={{ fontSize: '0.85rem', backgroundColor: '#FFFDF9' }}
          title="Reset to 0"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>

        <button
          type="button"
          onClick={handleFinishAndSave}
          disabled={current === 0}
          className="btn btn-sm btn-success rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1 shadow-xs text-white"
          style={{ backgroundColor: '#2E7D32', borderColor: '#2E7D32', fontSize: '0.85rem' }}
          title="Finish and save to Sadhana history"
        >
          <CheckCircle2 size={16} />
          <span>Finish & Save</span>
        </button>
      </div>

      {/* Mala Lap Celebration Modal */}
      <MalaCompleteModal
        isOpen={showCompleteModal}
        mantraTitle={title}
        malasCompleted={malasCompleted}
        totalChants={current}
        onContinueNextMala={handleContinueNextMala}
        onFinishAndSave={handleFinishAndSave}
      />
    </div>
  );
}

import React, { useMemo } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

/**
 * MalaBeadsVisual
 * Dynamically renders the exact number of beads based on target:
 * - If target is 108 (or multiple), renders 108 beads.
 * - If custom target (e.g. 10), renders exactly that many beads (e.g. 10 beads).
 * - Highlights completed beads, pulses the active bead, and shows completion state.
 */
export default function MalaBeadsVisual({
  currentBead = 0,
  targetBeads = 108,
  malasCompleted = 0,
  totalCurrent = 0,
  isAnimating = false,
  isCompleted = false,
}) {
  // Determine how many beads to render on the ring
  const totalVisualBeads = useMemo(() => {
    if (!targetBeads || targetBeads <= 0) return 108;
    // For counts <= 108 (e.g. 10, 21, 54, 108), show exactly that count of beads
    if (targetBeads <= 108) {
      return targetBeads;
    }
    // For multi-mala counts (e.g. 216, 324), standard 108 beads per lap
    return 108;
  }, [targetBeads]);

  // Current bead inside the visual ring
  const beadInRing = useMemo(() => {
    if (targetBeads <= 108) {
      return Math.min(currentBead, totalVisualBeads);
    }
    return (currentBead % 108 === 0 && currentBead > 0) ? 108 : (currentBead % 108);
  }, [currentBead, targetBeads, totalVisualBeads]);

  const progressPercent = Math.min(100, Math.round((totalCurrent / targetBeads) * 100));

  // Determine bead size dynamically so small counts (e.g. 10 beads) look full and clear
  const baseRadius = useMemo(() => {
    if (totalVisualBeads <= 12) return 10;
    if (totalVisualBeads <= 21) return 8.5;
    if (totalVisualBeads <= 36) return 7;
    if (totalVisualBeads <= 64) return 5.5;
    return 4.2;
  }, [totalVisualBeads]);

  // Compute positions of beads around the circular thread
  const beads = useMemo(() => {
    const list = [];
    const cx = 160;
    const cy = 160;
    const radius = 125;

    for (let i = 1; i <= totalVisualBeads; i++) {
      // Start just clockwise from the top (Guru bead)
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / totalVisualBeads;
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      list.push({ id: i, x, y });
    }
    return list;
  }, [totalVisualBeads]);

  return (
    <div className="mala-visual-container position-relative d-flex flex-column align-items-center justify-content-center">
      <svg
        className={`mala-svg ${isAnimating ? 'bead-pulse-anim' : ''}`}
        viewBox="0 0 320 320"
        width="300"
        height="300"
      >
        <defs>
          {/* Gradients for beads */}
          <radialGradient id="guruBeadGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="45%" stopColor="#E5A93C" />
            <stop offset="100%" stopColor="#8D5200" />
          </radialGradient>
          <radialGradient id="beadActiveGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FF9800" />
            <stop offset="100%" stopColor="#E65100" />
          </radialGradient>
          <radialGradient id="beadDoneGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFCC80" />
            <stop offset="70%" stopColor="#FB8C00" />
            <stop offset="100%" stopColor="#BF360C" />
          </radialGradient>
          <radialGradient id="beadPendingGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#D7CCC8" />
            <stop offset="60%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#4E342E" />
          </radialGradient>
          <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#FF9800" floodOpacity="0.8" />
          </filter>
          <filter id="guruGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#FFB300" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Outer thread / string holding beads */}
        <circle
          cx="160"
          cy="160"
          r="125"
          fill="none"
          stroke="#D7CCC8"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.6"
        />

        {/* Dynamic Beads along the ring */}
        {beads.map((bead) => {
          const isDone = bead.id <= beadInRing;
          const isActive = bead.id === beadInRing && !isCompleted;
          const currentRadius = isActive
            ? baseRadius * 1.3
            : isDone
            ? baseRadius * 1.05
            : baseRadius;

          return (
            <circle
              key={bead.id}
              cx={bead.x}
              cy={bead.y}
              r={currentRadius}
              fill={
                isActive
                  ? 'url(#beadActiveGrad)'
                  : isDone
                  ? 'url(#beadDoneGrad)'
                  : 'url(#beadPendingGrad)'
              }
              filter={isActive ? 'url(#activeGlow)' : undefined}
              className={`mala-bead-node ${isActive ? 'active-node' : ''}`}
            />
          );
        })}

        {/* Sumeru / Guru Bead at the Top */}
        <g transform="translate(160, 35)">
          {/* Guru bead cone/crown */}
          <polygon points="-6,10 6,10 0,1" fill="#FFB300" />
          {/* Main Guru bead */}
          <circle
            cx="0"
            cy="14"
            r="8.5"
            fill="url(#guruBeadGrad)"
            filter="url(#guruGlow)"
            stroke="#FFE082"
            strokeWidth="1"
          />
          {/* Tassel cords */}
          <line x1="-2" y1="23" x2="-3" y2="33" stroke="#E65100" strokeWidth="1.5" />
          <line x1="0" y1="23" x2="0" y2="35" stroke="#FF9800" strokeWidth="1.5" />
          <line x1="2" y1="23" x2="3" y2="33" stroke="#E65100" strokeWidth="1.5" />
        </g>

        {/* Central Display Ring */}
        <circle
          cx="160"
          cy="160"
          r="92"
          fill="#FFFDF9"
          stroke="#FFE0B2"
          strokeWidth="2"
        />
        <circle
          cx="160"
          cy="160"
          r="86"
          fill="#FFF8E1"
          opacity="0.5"
        />
      </svg>

      {/* Center Counter Info Overlay */}
      <div className="mala-center-content position-absolute text-center d-flex flex-column align-items-center justify-content-center">
        <span
          className="mala-bead-label text-muted text-uppercase fw-semibold"
          style={{ fontSize: '0.72rem', letterSpacing: '1px' }}
        >
          {isCompleted ? 'Finished' : 'Bead'}
        </span>

        <div
          className="mala-count-big fw-bold"
          style={{
            fontSize: '3.4rem',
            lineHeight: '1',
            color: isCompleted ? '#2E7D32' : '#B71C1C',
          }}
        >
          {beadInRing}
        </div>

        <div className="mala-target-sub text-muted fw-semibold" style={{ fontSize: '1rem', marginTop: '2px' }}>
          / {targetBeads}
        </div>

        {/* Status Badge */}
        {isCompleted ? (
          <div
            className="mt-2 badge rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 shadow-sm"
            style={{ backgroundColor: '#2E7D32', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: '500' }}
          >
            <CheckCircle2 size={13} />
            <span>Target Reached</span>
          </div>
        ) : targetBeads >= 108 ? (
          <div
            className="mt-2 badge rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 shadow-sm"
            style={{ backgroundColor: '#FF8F00', color: '#FFFFFF', fontSize: '0.75rem', fontWeight: '500' }}
          >
            <Layers size={13} />
            <span>Mala {malasCompleted + 1}</span>
            {malasCompleted > 0 && (
              <span className="ms-1 ps-1 border-start border-light-subtle">
                ({malasCompleted} done)
              </span>
            )}
          </div>
        ) : (
          <div
            className="mt-2 badge rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 shadow-sm"
            style={{ backgroundColor: '#FFF3E0', color: '#E65100', border: '1px solid #FFCC80', fontSize: '0.75rem', fontWeight: '500' }}
          >
            <span>{totalVisualBeads} Beads Set</span>
          </div>
        )}
      </div>

      {/* Progress Bar Footer below the Mala */}
      <div className="w-100 px-4 mt-2" style={{ maxWidth: '280px' }}>
        <div className="d-flex justify-content-between align-items-center text-muted mb-1" style={{ fontSize: '0.75rem' }}>
          <span>{isCompleted ? 'Completed' : 'Progress'}</span>
          <span className="fw-bold" style={{ color: isCompleted ? '#2E7D32' : '#E65100' }}>
            {progressPercent}%
          </span>
        </div>
        <div className="progress" style={{ height: '6px', backgroundColor: '#FFE0B2' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: isCompleted ? '#2E7D32' : '#FF8F00',
              transition: 'width 0.2s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}

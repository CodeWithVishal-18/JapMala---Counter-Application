import React from 'react';
import { BellRing, CheckCircle2, Layers, Volume2 } from 'lucide-react';
import { playTempleBell } from '../utils/sound';

export default function MalaCompleteModal({
  isOpen,
  mantraTitle,
  malasCompleted,
  totalChants,
  onContinueNextMala,
  onFinishAndSave,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: 'rgba(59, 31, 20, 0.65)', backdropFilter: 'blur(4px)', zIndex: 1055 }}
    >
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '440px' }}>
        <div
          className="modal-content border-0 shadow-lg text-center p-4"
          style={{
            backgroundColor: '#FFFDF9',
            borderRadius: '20px',
            border: '2px solid #FFE0B2',
          }}
        >
          {/* Top celebration icon with glow */}
          <div className="mb-3 d-inline-flex justify-content-center">
            <div
              className="rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm"
              style={{
                backgroundColor: '#FFF3E0',
                border: '2px solid #FFB74D',
                width: '76px',
                height: '76px',
              }}
            >
              <BellRing size={38} color="#E65100" />
            </div>
          </div>

          <h3 className="fw-bold mb-1" style={{ color: '#871C0C' }}>
            Mala Lap Completed!
          </h3>
          <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
            Sacred offering complete for <strong className="text-dark">{mantraTitle || 'Mantra'}</strong>
          </p>

          {/* Stats Summary Card */}
          <div
            className="p-3 mb-4 rounded-3 d-flex justify-content-around text-center"
            style={{ backgroundColor: '#FBE9E7', border: '1px solid #FFCCBC' }}
          >
            <div>
              <div className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                Completed
              </div>
              <div className="fw-bold fs-4" style={{ color: '#D84315' }}>
                {malasCompleted} {malasCompleted === 1 ? 'Mala' : 'Malas'}
              </div>
            </div>
            <div className="vr" style={{ opacity: 0.2 }} />
            <div>
              <div className="text-muted text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                Total Chants
              </div>
              <div className="fw-bold fs-4" style={{ color: '#D84315' }}>
                {totalChants}
              </div>
            </div>
          </div>

          {/* Replay Sound Button */}
          <div className="mb-4">
            <button
              type="button"
              onClick={playTempleBell}
              className="btn btn-sm btn-outline-warning text-dark px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1 shadow-sm"
              style={{ borderColor: '#FFB74D', backgroundColor: '#FFF8E1' }}
            >
              <Volume2 size={15} color="#E65100" />
              <span style={{ fontSize: '0.85rem' }}>Replay Temple Chime</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="d-flex flex-column gap-2">
            <button
              type="button"
              onClick={onContinueNextMala}
              className="btn btn-warning w-100 py-2 fw-semibold text-white d-flex align-items-center justify-content-center gap-2 rounded-pill shadow-sm"
              style={{
                backgroundColor: '#FF8F00',
                borderColor: '#FF8F00',
                fontSize: '1.05rem',
              }}
            >
              <Layers size={18} />
              <span>Continue Next Mala ({malasCompleted + 1})</span>
            </button>

            <button
              type="button"
              onClick={onFinishAndSave}
              className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2 rounded-pill"
              style={{ fontSize: '0.95rem' }}
            >
              <CheckCircle2 size={17} color="#2E7D32" />
              <span>Complete & Save to Sadhana</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

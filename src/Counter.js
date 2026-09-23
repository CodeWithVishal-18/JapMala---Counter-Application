import React, { useState } from 'react';
import { Layers, ArrowRight } from 'lucide-react';

export default function Counter({ onCreateCounter, onCancel }) {
  const [title, setTitle] = useState('');
  const [targetNumber, setTargetNumber] = useState('108');
  const [customMode, setCustomMode] = useState(false);

  const presets = [
    { label: '1 Mala (108)', value: 108 },
    { label: '3 Malas (324)', value: 324 },
    { label: '11 Malas (1,188)', value: 1188 },
    { label: '16 Malas (1,728)', value: 1728 },
    { label: '21 Chants', value: 21 },
    { label: '54 Chants', value: 54 },
  ];

  const handleSelectPreset = (val) => {
    setTargetNumber(String(val));
    setCustomMode(false);
  };

  const handleCreate = (e) => {
    if (e) e.preventDefault();
    const cleanTitle = title.trim() || 'Mantra Jaap';
    const target = parseInt(targetNumber, 10);

    if (isNaN(target) || target <= 0) {
      alert('Please enter a target number greater than 0');
      return;
    }

    onCreateCounter({
      title: cleanTitle,
      target: target,
      current: 0,
      malasCompleted: 0,
      startedAt: Date.now(),
    });
  };

  return (
    <div className="p-3 d-flex justify-content-center mx-auto w-100" style={{ maxWidth: '580px' }}>
      <div
        className="card border-0 shadow-sm p-4 w-100 rounded-4"
        style={{ backgroundColor: '#FFFDF9', border: '1.5px solid #FFE0B2' }}
      >
        <div className="text-center mb-3">
          <div
            className="p-2 rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-2"
            style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}
          >
            <Layers size={28} />
          </div>
          <h3 className="fw-bold mb-1" style={{ color: '#5A2E22' }}>
            Set Up Your Jaap Counter
          </h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Choose a traditional Mala count or customize your practice
          </p>
        </div>

        <form onSubmit={handleCreate}>
          {/* Mantra / Practice Title */}
          <div className="mb-3">
            <label htmlFor="mantraTitle" className="form-label fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
              What would you like to chant?
            </label>
            <input
              type="text"
              id="mantraTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control rounded-3 py-2"
              placeholder="e.g. Om Namah Shivaya, Hare Krishna, Gayatri..."
            />
          </div>

          {/* Quick Mala Presets */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-dark d-flex align-items-center justify-content-between" style={{ fontSize: '0.95rem' }}>
              <span>Select Count or Malas</span>
              <span className="badge rounded-pill" style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}>
                1 Mala = 108 Beads
              </span>
            </label>

            <div className="d-flex flex-wrap gap-2 mb-2">
              {presets.map((preset) => {
                const isSelected = !customMode && String(preset.value) === String(targetNumber);
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handleSelectPreset(preset.value)}
                    className={`btn btn-sm rounded-pill px-3 py-1 ${
                      isSelected ? 'btn-warning text-white fw-semibold shadow-sm' : 'btn-outline-secondary'
                    }`}
                    style={
                      isSelected
                        ? { backgroundColor: '#FF8F00', borderColor: '#FF8F00' }
                        : { borderColor: '#E0E0E0', fontSize: '0.85rem' }
                    }
                  >
                    {preset.label}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCustomMode(true)}
                className={`btn btn-sm rounded-pill px-3 py-1 ${
                  customMode ? 'btn-warning text-white fw-semibold shadow-sm' : 'btn-outline-secondary'
                }`}
                style={
                  customMode
                    ? { backgroundColor: '#FF8F00', borderColor: '#FF8F00' }
                    : { borderColor: '#E0E0E0', fontSize: '0.85rem' }
                }
              >
                Custom Count
              </button>
            </div>

            {/* Target input if custom mode or for fine-tuning */}
            <div className="mt-2">
              <div className="input-group">
                <span className="input-group-text bg-light text-muted border-end-0">Target Chants</span>
                <input
                  type="number"
                  value={targetNumber}
                  onChange={(e) => {
                    setTargetNumber(e.target.value);
                    setCustomMode(true);
                  }}
                  className="form-control rounded-end-3"
                  min="1"
                  required
                />
              </div>
              <small className="text-muted mt-1 d-block" style={{ fontSize: '0.8rem' }}>
                {parseInt(targetNumber, 10) >= 108 &&
                  `Approx. ${(parseInt(targetNumber, 10) / 108).toFixed(1)} Malas (${Math.floor(
                    parseInt(targetNumber, 10) / 108
                  )} full + ${parseInt(targetNumber, 10) % 108} beads)`}
              </small>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2 mt-4">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-outline-secondary rounded-pill w-50 py-2"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn btn-warning text-white fw-semibold rounded-pill py-2 shadow-sm d-flex align-items-center justify-content-center gap-2 flex-grow-1"
              style={{ backgroundColor: '#FF8F00', borderColor: '#FF8F00', fontSize: '1.05rem' }}
            >
              <span>Begin Chanting</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

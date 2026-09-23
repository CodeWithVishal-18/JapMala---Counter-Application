import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, BookOpen } from 'lucide-react';

export default function GetMantras(props) {
  const mantras = props.sendMantra;
  const navigate = useNavigate();

  const handleStartJaap = () => {
    const title = mantras?.mantra ? `${mantras.deity || 'Mantra'} Jaap` : 'Mantra Jaap';
    navigate('/', { state: { autoStartCounter: { title, target: 108 } } });
  };

  if (!mantras || (!mantras.deity && !mantras.mantra)) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading sacred mantra...</span>
        </div>
        <p className="mt-3 text-muted">Retrieving mantra text...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 mx-auto" style={{ maxWidth: '680px' }}>
      <div className="mb-3">
        <Link
          to="/"
          className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1"
          style={{ fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div
        className="card border-0 shadow-sm rounded-4 overflow-hidden"
        style={{ backgroundColor: '#FFFDF9', border: '1.5px solid #FFE0B2' }}
      >
        <div
          className="card-header border-0 py-3 px-4 d-flex align-items-center justify-content-between"
          style={{ backgroundColor: '#FFF3E0', borderBottom: '1px solid #FFE0B2' }}
        >
          <div className="d-flex align-items-center gap-2">
            <BookOpen size={20} color="#E65100" />
            <h4 className="fw-bold mb-0" style={{ color: '#BF360C' }}>
              {mantras.deity}
            </h4>
          </div>
          <span className="badge rounded-pill" style={{ backgroundColor: '#FF8F00', color: '#FFFFFF' }}>
            Sacred Mantra
          </span>
        </div>

        <div className="card-body p-4 text-center">
          <div className="py-2">
            <h3 className="fw-bold mb-3 lh-base" style={{ color: '#D84315' }}>
              “ {mantras.mantra} ”
            </h3>

            {mantras.meaning && (
              <div className="p-3 mb-3 rounded-3" style={{ backgroundColor: '#FFF8E1', border: '1px dashed #FFD54F' }}>
                <span className="text-uppercase fw-semibold text-muted d-block mb-1" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                  Meaning & Significance
                </span>
                <p className="mb-0 fst-italic" style={{ color: '#5D4037', fontSize: '0.95rem' }}>
                  {mantras.meaning}
                </p>
              </div>
            )}

            {mantras.benefits && (
              <div className="mb-4">
                <span className="badge px-3 py-1 rounded-pill mb-2" style={{ backgroundColor: '#EFEBE9', color: '#4E342E', fontSize: '0.8rem' }}>
                  Spiritual Benefits
                </span>
                <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                  {mantras.benefits}
                </p>
              </div>
            )}

            {/* Quick Action: Start 108 Jaap */}
            <button
              type="button"
              onClick={handleStartJaap}
              className="btn btn-warning text-white fw-semibold rounded-pill px-4 py-2 shadow-sm d-inline-flex align-items-center gap-2"
              style={{ backgroundColor: '#FF8F00', borderColor: '#FF8F00', fontSize: '1rem' }}
            >
              <Play size={18} fill="#FFFFFF" />
              <span>Start 108 Jaap Counter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

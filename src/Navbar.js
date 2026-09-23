import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, History } from 'lucide-react';
import { getStreakData } from './utils/storage';

export default function Navbar({ onOpenHistory, onGoHome }) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const data = getStreakData();
    setStreak(data.currentStreak);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-xs"
      style={{
        backgroundColor: '#FFE3DA',
        borderBottom: '1px solid #FFCCBC',
        zIndex: 1030,
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={onGoHome}
          className="navbar-brand d-flex align-items-center gap-2 p-0"
          style={{ textDecoration: 'none' }}
        >
          <img src="/JapMala.png" alt="JapMala logo" width="90" height="45" style={{ objectFit: 'contain' }} />
        </Link>

        {/* Right Nav Utilities (Streak & History) */}
        <div className="d-flex align-items-center gap-2">
          {streak > 0 && (
            <div
              className="badge rounded-pill px-3 py-2 d-flex align-items-center gap-1 shadow-xs"
              style={{ backgroundColor: '#FFF3E0', color: '#BF360C', border: '1px solid #FFB74D', fontSize: '0.85rem' }}
              title={`${streak}-day active chanting streak`}
            >
              <Flame size={15} color="#E65100" />
              <span className="fw-bold">{streak}d</span>
            </div>
          )}

          <button
            type="button"
            onClick={onOpenHistory}
            className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 d-inline-flex align-items-center gap-1 shadow-xs"
            style={{ fontSize: '0.85rem', backgroundColor: '#FFFDF9' }}
          >
            <History size={15} color="#E65100" />
            <span className="d-none d-sm-inline">Sadhana</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
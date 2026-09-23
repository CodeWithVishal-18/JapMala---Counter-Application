import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import {
  Flame,
  History,
  Plus,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { getStreakData } from './utils/storage';

export default function Home({ onCreateClick, onViewHistory }) {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    totalChants: 0,
    totalMalas: 0,
  });

  useEffect(() => {
    setStreakData(getStreakData());
  }, []);

  const mantrasList = [
    { title: 'Gayatri Mantra', path: '/gayatrimantra', deity: 'Vedic' },
    { title: 'Mahamrityunjaya Jaap', path: '/mahamritunjayjap', deity: 'Shiv Ji' },
    { title: 'Hanuman Ji', path: '/hanumanji', deity: 'Sankatmochan' },
    { title: 'Ganesh Ji', path: '/ganeshji', deity: 'Vighnaharta' },
    { title: 'Shiv Ji', path: '/shivji', deity: 'Mahadev' },
    { title: 'Vishnu Ji', path: '/vishnuji', deity: 'Narayan' },
  ];

  return (
    <div className="home-container py-3">
      {/* Daily Streak Highlight Banner */}
      <div
        className="card border-0 shadow-sm p-3 mb-4 mx-auto rounded-4"
        style={{
          maxWidth: '720px',
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
          border: '1.5px solid #FFCC80',
        }}
      >
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3">
            <div
              className="p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{ backgroundColor: '#FF6F00', color: '#FFFFFF', width: '48px', height: '48px' }}
            >
              <Flame size={28} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-bold fs-5" style={{ color: '#BF360C' }}>
                  {streakData.currentStreak} Day Sadhana Streak
                </span>
                <span className="badge rounded-pill bg-white text-dark shadow-xs" style={{ fontSize: '0.75rem' }}>
                  Active
                </span>
              </div>
              <small className="text-muted d-block" style={{ fontSize: '0.8rem' }}>
                {streakData.totalChants > 0
                  ? `${streakData.totalChants.toLocaleString()} total chants • ${streakData.totalMalas} malas completed`
                  : 'Chant daily to build your streak'}
              </small>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewHistory}
            className="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1 shadow-sm"
            style={{ backgroundColor: '#FFFFFF', borderColor: '#FFB74D', fontSize: '0.85rem' }}
          >
            <History size={15} color="#E65100" />
            <span>Sadhana History</span>
          </button>
        </div>
      </div>

      {/* Hero Welcome Card */}
      <div
        className="card border-0 shadow-sm p-4 p-md-5 mb-4 mx-auto text-center rounded-4"
        style={{
          maxWidth: '720px',
          backgroundColor: '#FFFDF9',
          border: '1.5px solid #FFE0B2',
        }}
      >
        <h2 className="fw-bold mb-1" style={{ fontSize: '2.4rem', color: '#5A2E22' }}>
          Welcome to JapMala
        </h2>
        <p className="mantra mb-4" style={{ color: '#8D4F38', fontSize: '1.25rem', fontStyle: 'italic' }}>
          “ हर स्पर्श में मंत्र ”
        </p>
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: '480px', fontSize: '1rem', lineHeight: '1.6' }}>
          A simple and peaceful way to count your daily mantras, track your progress, and stay focused.
        </p>

        <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={onCreateClick}
            className="btn btn-warning text-white fw-semibold rounded-pill px-4 py-2 shadow-sm d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: '#FF8F00', borderColor: '#FF8F00', fontSize: '1.05rem' }}
          >
            <Plus size={20} />
            <span>Add Counter</span>
          </button>

          <button
            type="button"
            onClick={onViewHistory}
            className="btn btn-outline-secondary rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
            style={{ fontSize: '1.05rem' }}
          >
            <History size={18} />
            <span>View History</span>
          </button>
        </div>
      </div>

      {/* Mantra Categories Section */}
      <div className="mx-auto" style={{ maxWidth: '720px' }}>
        <div className="d-flex align-items-center justify-content-between mb-3 px-1">
          <h4 className="fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: '#5A2E22' }}>
            <BookOpen size={20} color="#FF8F00" />
            <span>Mantra Categories</span>
          </h4>
          <span className="text-muted small">Explore mantras and their meanings</span>
        </div>

        <div className="row g-2">
          {mantrasList.map((m) => (
            <div key={m.path} className="col-12 col-sm-6">
              <Link to={m.path} style={{ textDecoration: 'none' }}>
                <div
                  className="card border-0 shadow-xs p-3 rounded-3 d-flex flex-row align-items-center justify-content-between mantra-category-item"
                  style={{
                    backgroundColor: '#FFFDF9',
                    border: '1px solid #FFE0B2',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="p-2 rounded-circle"
                      style={{ backgroundColor: '#FFF3E0', color: '#E65100' }}
                    >
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div className="fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>
                        {m.title}
                      </div>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {m.deity}
                      </small>
                    </div>
                  </div>

                  <ArrowRight size={16} className="text-muted opacity-75" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
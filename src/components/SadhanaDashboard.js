import React, { useState, useEffect } from 'react';
import {
  Flame,
  Award,
  Layers,
  Sparkles,
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import {
  getStreakData,
  getHistorySessions,
} from '../utils/storage';

export default function SadhanaDashboard({ onBackToHome, onStartChanting }) {
  const [streak, setStreak] = useState({
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
    totalChants: 0,
    totalMalas: 0,
    totalSessions: 0,
  });
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setStreak(getStreakData());
    setSessions(getHistorySessions());
  }, []);

  const milestones = [
    { days: 3, label: '3-Day Sankalpa', desc: 'Initial dedication' },
    { days: 7, label: '7-Day Anushthana', desc: 'Weekly consistency' },
    { days: 21, label: '21-Day Habit', desc: 'Mindful routine formed' },
    { days: 108, label: '108-Day Mahatapas', desc: 'Supreme mastery' },
  ];

  return (
    <div className="sadhana-dashboard py-4 mx-auto w-100" style={{ maxWidth: '800px' }}>
      {/* Top Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
        <button
          type="button"
          onClick={onBackToHome}
          className="btn btn-outline-secondary d-inline-flex align-items-center gap-1 rounded-pill px-3 py-1"
          style={{ fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
        <h2 className="mb-0 fw-bold" style={{ color: '#5A2E22' }}>
          Sadhana & Streak Tracker
        </h2>
        {onStartChanting && (
          <button
            type="button"
            onClick={onStartChanting}
            className="btn btn-warning text-white rounded-pill px-3 py-1 fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
            style={{ backgroundColor: '#FF8F00', borderColor: '#FF8F00', fontSize: '0.9rem' }}
          >
            <Sparkles size={15} />
            <span>New Jaap</span>
          </button>
        )}
      </div>

      {/* Streak Hero Banner */}
      <div
        className="card border-0 shadow-sm p-4 mb-4 text-center text-md-start"
        style={{
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
          borderRadius: '16px',
          border: '1px solid #FFCC80',
        }}
      >
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="p-3 rounded-circle d-flex align-items-center justify-content-center shadow-sm"
              style={{ backgroundColor: '#FF6F00', color: '#FFFFFF', width: '64px', height: '64px' }}
            >
              <Flame size={36} />
            </div>
            <div>
              <div className="text-uppercase fw-semibold" style={{ fontSize: '0.8rem', color: '#BF360C', letterSpacing: '1px' }}>
                Daily Sadhana Streak
              </div>
              <div className="fw-bold display-6 mb-0" style={{ color: '#E65100', lineHeight: 1.1 }}>
                {streak.currentStreak} {streak.currentStreak === 1 ? 'Day' : 'Days'}
              </div>
              <small className="text-muted" style={{ fontSize: '0.85rem' }}>
                Best Streak: <strong>{streak.bestStreak} days</strong>
                {streak.lastActiveDate && ` • Last active: ${streak.lastActiveDate}`}
              </small>
            </div>
          </div>

          <div className="text-md-end">
            <div className="badge px-3 py-2 rounded-pill shadow-sm" style={{ backgroundColor: '#E65100', color: '#FFFFFF', fontSize: '0.85rem' }}>
              <TrendingUp size={14} className="me-1" />
              <span>Chant daily to keep the flame alive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lifetime Stats Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3 rounded-4" style={{ backgroundColor: '#FFFDF9', border: '1px solid #FFE0B2' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
              <Sparkles size={18} color="#FF8F00" />
              <span className="fw-semibold">Total Chants</span>
            </div>
            <div className="fw-bold fs-3" style={{ color: '#B71C1C' }}>
              {streak.totalChants.toLocaleString()}
            </div>
            <small className="text-muted">Lifetime repetitions recorded</small>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3 rounded-4" style={{ backgroundColor: '#FFFDF9', border: '1px solid #FFE0B2' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
              <Layers size={18} color="#FF8F00" />
              <span className="fw-semibold">Total Malas</span>
            </div>
            <div className="fw-bold fs-3" style={{ color: '#B71C1C' }}>
              {streak.totalMalas.toLocaleString()}
            </div>
            <small className="text-muted">Full 108-bead cycles completed</small>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 border-0 shadow-sm p-3 rounded-4" style={{ backgroundColor: '#FFFDF9', border: '1px solid #FFE0B2' }}>
            <div className="d-flex align-items-center gap-2 mb-2 text-muted" style={{ fontSize: '0.85rem' }}>
              <Calendar size={18} color="#FF8F00" />
              <span className="fw-semibold">Sessions</span>
            </div>
            <div className="fw-bold fs-3" style={{ color: '#B71C1C' }}>
              {streak.totalSessions.toLocaleString()}
            </div>
            <small className="text-muted">Total meditation sessions</small>
          </div>
        </div>
      </div>

      {/* Sadhana Milestones */}
      <div className="card border-0 shadow-sm p-4 mb-4 rounded-4" style={{ backgroundColor: '#FFFDF9', border: '1px solid #FFE0B2' }}>
        <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: '#5A2E22' }}>
          <Award size={20} color="#FF8F00" />
          <span>Sadhana Milestone Badges</span>
        </h5>
        <div className="row g-2">
          {milestones.map((m) => {
            const unlocked = streak.bestStreak >= m.days;
            return (
              <div key={m.days} className="col-6 col-md-3">
                <div
                  className="p-3 text-center rounded-3 h-100 d-flex flex-column align-items-center justify-content-center"
                  style={{
                    backgroundColor: unlocked ? '#FFF3E0' : '#F5F5F5',
                    border: unlocked ? '1.5px solid #FFB74D' : '1px dashed #E0E0E0',
                    opacity: unlocked ? 1 : 0.65,
                  }}
                >
                  <div
                    className="p-2 rounded-circle mb-2"
                    style={{
                      backgroundColor: unlocked ? '#FF8F00' : '#BDBDBD',
                      color: '#FFFFFF',
                    }}
                  >
                    <Award size={22} />
                  </div>
                  <div className="fw-bold" style={{ fontSize: '0.85rem', color: unlocked ? '#BF360C' : '#616161' }}>
                    {m.label}
                  </div>
                  <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                    {unlocked ? (
                      <span className="text-success d-inline-flex align-items-center gap-1">
                        <CheckCircle2 size={11} /> Unlocked
                      </span>
                    ) : (
                      `${m.days} Days goal`
                    )}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* History Log */}
      <div className="card border-0 shadow-sm p-4 rounded-4" style={{ backgroundColor: '#FFFDF9', border: '1px solid #FFE0B2' }}>
        <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <h5 className="fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: '#5A2E22' }}>
            <Clock size={20} color="#FF8F00" />
            <span>Session History Log</span>
            <span className="badge rounded-pill bg-light text-muted border ms-1" style={{ fontSize: '0.75rem' }}>
              {sessions.length}
            </span>
          </h5>

          <span
            className="badge rounded-pill bg-light text-muted border d-inline-flex align-items-center gap-1 px-3 py-1"
            style={{ fontSize: '0.78rem' }}
          >
            <Clock size={12} color="#E65100" />
            <span>Retained for 10 days</span>
          </span>
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <Clock size={40} className="mb-2 opacity-50" />
            <p className="mb-2">No chanting sessions recorded yet.</p>
            <small>Start your first Jaap to record your sadhana and daily streak!</small>
          </div>
        ) : (
          <div className="list-group list-group-flush">
            {sessions.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex align-items-center justify-content-between py-3 px-2 border-bottom"
                style={{ backgroundColor: 'transparent' }}
              >
                <div>
                  <div className="fw-semibold text-dark" style={{ fontSize: '0.98rem' }}>
                    {item.title}
                  </div>
                  <div className="text-muted d-flex align-items-center gap-2 mt-1" style={{ fontSize: '0.78rem' }}>
                    <Calendar size={13} />
                    <span>{item.date} at {item.time}</span>
                    {item.durationSeconds > 0 && (
                      <>
                        <span>•</span>
                        <Clock size={13} />
                        <span>{Math.round(item.durationSeconds / 60)} min</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-end">
                  <span className="badge px-2 py-1 rounded-pill" style={{ backgroundColor: '#FFF3E0', color: '#E65100', border: '1px solid #FFCC80', fontSize: '0.82rem' }}>
                    {item.chants} chants
                  </span>
                  {item.malas > 0 && (
                    <div className="text-muted small mt-1" style={{ fontSize: '0.75rem' }}>
                      {item.malas} {item.malas === 1 ? 'Mala' : 'Malas'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

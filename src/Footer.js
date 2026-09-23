import React from 'react';
import './Home.css';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-center py-3 footer mt-auto" style={{ backgroundColor: '#FFE3DA', borderTop: '1px solid #FFCCBC' }}>
      <div className="container">
        <p className="mb-1 text-muted" style={{ fontSize: '0.85rem' }}>
          © 2026 JapMala • Sacred Mindfulness & Jaap Practice
        </p>
        <p className="mb-0 d-inline-flex align-items-center justify-content-center gap-1 text-muted flex-wrap" style={{ fontSize: '0.9rem' }}>
          <Heart size={14} color="#D32F2F" fill="#D32F2F" />
          <span>Developed by</span>
          <a
            href="https://www.linkedin.com/in/vishal-shukla-1818vk"
            className="devName fw-semibold"
            target="_blank"
            rel="noreferrer"
          >
            Vishal Shukla
          </a>
          <Sparkles size={14} color="#FF9800" />
        </p>
      </div>
    </footer>
  );
}

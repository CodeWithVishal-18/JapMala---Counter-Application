// LocalStorage Persistence Utility for JapMala Sadhana & Streak Tracking

const STORAGE_KEYS = {
  HISTORY: 'japmala_sadhana_history_v1',
  STREAK: 'japmala_streak_v1',
  ACTIVE: 'japmala_active_counter_v1',
};

/**
 * Returns today's date formatted as YYYY-MM-DD in local time
 */
export function getTodayDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns yesterday's date formatted as YYYY-MM-DD
 */
export function getYesterdayDateString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return getTodayDateString(d);
}

/**
 * Get the current streak and lifetime stats
 */
export function getStreakData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!raw) {
      return {
        currentStreak: 0,
        bestStreak: 0,
        lastActiveDate: null,
        totalChants: 0,
        totalMalas: 0,
        totalSessions: 0,
      };
    }
    const data = JSON.parse(raw);
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    // Check if the streak has lapsed (if last active was before yesterday)
    let currentStreak = data.currentStreak || 0;
    if (data.lastActiveDate && data.lastActiveDate !== today && data.lastActiveDate !== yesterday) {
      currentStreak = 0; // Streak broken
    }

    return {
      currentStreak,
      bestStreak: data.bestStreak || 0,
      lastActiveDate: data.lastActiveDate || null,
      totalChants: data.totalChants || 0,
      totalMalas: data.totalMalas || 0,
      totalSessions: data.totalSessions || 0,
    };
  } catch (err) {
    console.error('Error reading streak data:', err);
    return { currentStreak: 0, bestStreak: 0, lastActiveDate: null, totalChants: 0, totalMalas: 0, totalSessions: 0 };
  }
}

/**
 * Records chanting progress and updates daily streak
 */
export function recordChantingProgress(chantsAdded, malasAdded = 0) {
  try {
    const streak = getStreakData();
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let newCurrentStreak = streak.currentStreak;

    if (streak.lastActiveDate === today) {
      // Already chanted today, maintain streak
      newCurrentStreak = Math.max(1, streak.currentStreak);
    } else if (streak.lastActiveDate === yesterday) {
      // Consecutive day!
      newCurrentStreak = streak.currentStreak + 1;
    } else {
      // First day or streak broke
      newCurrentStreak = 1;
    }

    const updatedStreak = {
      currentStreak: newCurrentStreak,
      bestStreak: Math.max(streak.bestStreak, newCurrentStreak),
      lastActiveDate: today,
      totalChants: (streak.totalChants || 0) + chantsAdded,
      totalMalas: (streak.totalMalas || 0) + malasAdded,
      totalSessions: (streak.totalSessions || 0) + 1,
    };

    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(updatedStreak));
    return updatedStreak;
  } catch (err) {
    console.error('Error saving streak progress:', err);
    return null;
  }
}

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds

/**
 * Filter out sessions older than 10 days
 */
export function pruneOldHistorySessions(sessions = []) {
  const now = Date.now();
  return sessions.filter((item) => {
    if (item.timestamp) {
      return now - item.timestamp <= TEN_DAYS_MS;
    }
    if (item.date) {
      const itemTime = new Date(item.date).getTime();
      return !isNaN(itemTime) && now - itemTime <= TEN_DAYS_MS;
    }
    return true;
  });
}

/**
 * Get all sadhana history sessions (automatically cleans up sessions older than 10 days)
 */
export function getHistorySessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const history = JSON.parse(raw);
    const valid = Array.isArray(history) ? history : [];
    
    // Automatically prune sessions older than 10 days
    const pruned = pruneOldHistorySessions(valid);
    if (pruned.length !== valid.length) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(pruned));
    }
    return pruned;
  } catch (err) {
    console.error('Error reading history sessions:', err);
    return [];
  }
}

/**
 * Save a completed or ended chanting session into history (with 10-day auto-retention)
 */
export function saveHistorySession({ title, chants, malas, durationSeconds = 0 }) {
  if (!chants || chants <= 0) return null;

  try {
    const history = getHistorySessions();
    const now = new Date();
    const newSession = {
      id: 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      title: title || 'Mantra Jaap',
      chants: Number(chants),
      malas: Number(malas) || Math.floor(chants / 108),
      date: getTodayDateString(now),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: now.getTime(),
      durationSeconds: Math.round(durationSeconds),
    };

    // Combine with current history and prune any entries older than 10 days
    const pruned = pruneOldHistorySessions([newSession, ...history]);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(pruned));

    // Update streak and totals
    recordChantingProgress(newSession.chants, newSession.malas);

    return newSession;
  } catch (err) {
    console.error('Error saving history session:', err);
    return null;
  }
}

/**
 * Active counter persistence (in case of page refresh)
 */
export function saveActiveCounter(counter) {
  try {
    if (!counter) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE);
    } else {
      localStorage.setItem(STORAGE_KEYS.ACTIVE, JSON.stringify(counter));
    }
  } catch (err) {
    console.error('Error saving active counter:', err);
  }
}

export function getSavedActiveCounter() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error('Error reading saved active counter:', err);
    return null;
  }
}

export function clearSavedActiveCounter() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE);
  } catch (err) {
    console.error('Error clearing active counter:', err);
  }
}

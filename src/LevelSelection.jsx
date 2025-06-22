import React, { useState } from 'react';

const levels = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

const themes = [
  { label: 'Numbers', value: 'numbers' },
  { label: 'Letters', value: 'letters' },
  { label: 'Symbols', value: 'symbols' },
];

export default function LevelSelection({ onStart }) {
  const [level, setLevel] = useState('beginner');
  const [theme, setTheme] = useState('numbers');
  const [highContrast, setHighContrast] = useState(false);

  const handleStart = () => {
    onStart({ level, theme, highContrast });
  };

  return (
    <div className={`level-selection${highContrast ? ' high-contrast' : ''}`}> 
      <h2>MemoryMatrix</h2>
      <div>
        <h3>Choose Level</h3>
        {levels.map(l => (
          <button
            key={l.value}
            className={level === l.value ? 'selected' : ''}
            onClick={() => setLevel(l.value)}
            style={{ fontSize: '1.2em', margin: '0.5em' }}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div>
        <h3>Choose Theme</h3>
        {themes.map(t => (
          <button
            key={t.value}
            className={theme === t.value ? 'selected' : ''}
            onClick={() => setTheme(t.value)}
            style={{ fontSize: '1.2em', margin: '0.5em' }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ margin: '1em 0' }}>
        <label style={{ fontSize: '1.1em' }}>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={e => setHighContrast(e.target.checked)}
          />
          High Contrast
        </label>
      </div>
      <button onClick={handleStart} style={{ fontSize: '1.3em', marginTop: '1em' }}>
        Start Game
      </button>
    </div>
  );
} 
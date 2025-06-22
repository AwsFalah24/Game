import React from 'react';

export default function EndScreen({ results, onRetry, onNextLevel, highContrast }) {
  return (
    <div className={`end-screen${highContrast ? ' high-contrast' : ''}`}> 
      <h2>Game Over!</h2>
      <div style={{ fontSize: '1.3em', margin: '1em 0' }}>
        <div>Total Time: <b>{results.time.toFixed(1)}s</b></div>
        <div>Accuracy: <b>{results.accuracy}%</b></div>
        <div>Attempts: <b>{results.attempts}</b></div>
      </div>
      <div style={{ margin: '1.5em 0', fontSize: '1.2em' }}>
        <span className="encouragement-purple">Nice work! Keep practicing.</span>
      </div>
      <div>
        <button onClick={onRetry} style={{ fontSize: '1.1em', margin: '0.5em' }}>Retry Same Level</button>
        <button onClick={onNextLevel} style={{ fontSize: '1.1em', margin: '0.5em' }}>Move to Next Level</button>
      </div>
    </div>
  );
} 
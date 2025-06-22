import React, { useState, useEffect } from 'react';

const themesData = {
  numbers: Array.from({ length: 6 }, (_, i) => (i + 1).toString()),
  letters: ['A', 'B', 'C', 'D', 'E', 'F'],
  symbols: ['★', '●', '▲', '■', '♥', '♣'],
};

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MemoryMatrixGame({ level, theme, highContrast, onEnd, onReturnToMenu }) {
  // Set grid size and pairs based on level
  let gridConfig = { rows: 3, cols: 4, pairs: 6 };
  if (level === 'intermediate') gridConfig = { rows: 4, cols: 5, pairs: 10 };
  if (level === 'advanced') gridConfig = { rows: 6, cols: 6, pairs: 18 };

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices
  const [matched, setMatched] = useState([]); // indices
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [startTime] = useState(Date.now());
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Setup cards
    let values = themesData[theme];
    // Repeat or slice values to get enough pairs
    let neededValues = [];
    while (neededValues.length < gridConfig.pairs) {
      neededValues = neededValues.concat(values);
    }
    neededValues = neededValues.slice(0, gridConfig.pairs);
    const pairValues = shuffle([...neededValues, ...neededValues]);
    setCards(pairValues.map((val, idx) => ({ val, idx })));
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setCorrect(0);
    setFeedback('');
    // eslint-disable-next-line
  }, [level, theme]);

  useEffect(() => {
    if (matched.length === gridConfig.pairs * 2 && matched.length > 0) {
      // Game finished
      setTimeout(() => {
        onEnd({
          time: (Date.now() - startTime) / 1000,
          attempts,
          correct,
          accuracy: attempts ? Math.round((correct / attempts) * 100) : 100,
        });
      }, 800);
    }
    // eslint-disable-next-line
  }, [matched]);

  useEffect(() => {
    if (matched.length < gridConfig.pairs * 2) {
      const interval = setInterval(() => setTimer(Date.now() - startTime), 1000);
      return () => clearInterval(interval);
    }
  }, [matched, startTime]);

  const handleCardClick = idx => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setAttempts(a => a + 1);
      const [i1, i2] = newFlipped;
      if (cards[i1].val === cards[i2].val) {
        setTimeout(() => {
          setMatched(m => [...m, i1, i2]);
          setCorrect(c => c + 1);
          setFeedback('Good job!');
          setFlipped([]);
        }, 700);
      } else {
        setTimeout(() => {
          setFeedback('Try again.');
          setFlipped([]);
        }, 700);
      }
    } else {
      setFeedback('');
    }
  };

  // Calculate game box size based on grid size
  const boxWidth = gridConfig.cols * 70 + 40;
  const boxHeight = gridConfig.rows * 70 + 120;

  return (
    <div className={`memory-matrix${highContrast ? ' high-contrast' : ''}`} style={{ width: boxWidth, minHeight: boxHeight, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2>Match the Pairs!</h2>
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
          gap: '10px',
          width: gridConfig.cols * 60 + 20,
          height: gridConfig.rows * 60 + 20,
          justifyContent: 'center',
          alignItems: 'center',
          margin: '2em 0',
          background: 'rgba(0,0,0,0.04)',
          borderRadius: 14,
          padding: 10,
        }}
      >
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              className={`card${isFlipped ? ' flipped' : ''}`}
              style={{
                fontSize: '1.3em',
                width: '100%',
                height: '100%',
                aspectRatio: '1/1',
                borderRadius: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s, color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: isFlipped || flipped.length === 2 ? 'default' : 'pointer',
                padding: 0,
                minWidth: 0,
                minHeight: 0,
                overflow: 'hidden',
              }}
              onClick={() => handleCardClick(idx)}
              aria-label={isFlipped ? card.val : 'Hidden card'}
              disabled={!isFlipped && !matched.includes(idx) && flipped.length === 2}
            >
              {isFlipped ? card.val : '?'}
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: '1.2em', minHeight: '2em' }}>
        {feedback === 'Good job!' && <span className="feedback-correct">{feedback}</span>}
        {feedback === 'Try again.' && <span className="feedback-wrong">{feedback}</span>}
        {feedback !== 'Good job!' && feedback !== 'Try again.' && feedback}
      </div>
      <div style={{ margin: '1em 0' }}>Pairs: {matched.length / 2}/{gridConfig.pairs}</div>
      <div style={{ margin: '1em 0' }}>Attempts: {attempts}</div>
      <div style={{ margin: '1em 0' }}>Time: {Math.floor(timer / 1000)}s</div>
      <button
        onClick={onReturnToMenu}
        style={{ marginTop: '1.5em', fontSize: '1.1em', padding: '0.7em 2em', borderRadius: 8 }}
      >
        Return to Menu
      </button>
    </div>
  );
} 
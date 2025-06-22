import { useState } from 'react'
import './App.css'
import LevelSelection from './LevelSelection.jsx'
import MemoryMatrixGame from './MemoryMatrixGame.jsx'
import EndScreen from './EndScreen.jsx'

const levelOrder = ['beginner', 'intermediate', 'advanced']

function App() {
  const [screen, setScreen] = useState('select')
  const [level, setLevel] = useState('beginner')
  const [theme, setTheme] = useState('numbers')
  const [highContrast, setHighContrast] = useState(false)
  const [results, setResults] = useState(null)

  const handleStart = ({ level, theme, highContrast }) => {
    setLevel(level)
    setTheme(theme)
    setHighContrast(highContrast)
    setScreen('game')
  }

  const handleEnd = (results) => {
    setResults(results)
    setScreen('end')
  }

  const handleRetry = () => {
    setScreen('game')
  }

  const handleNextLevel = () => {
    const idx = levelOrder.indexOf(level)
    const nextLevel = levelOrder[Math.min(idx + 1, levelOrder.length - 1)]
    setLevel(nextLevel)
    setScreen('game')
  }

  const handleReturnToMenu = () => {
    setScreen('select')
  }

  return (
    <div className={highContrast ? 'high-contrast' : ''}>
      {screen === 'select' && (
        <LevelSelection onStart={handleStart} />
      )}
      {screen === 'game' && (
        <MemoryMatrixGame
          level={level}
          theme={theme}
          highContrast={highContrast}
          onEnd={handleEnd}
          onReturnToMenu={handleReturnToMenu}
        />
      )}
      {screen === 'end' && results && (
        <EndScreen
          results={results}
          onRetry={handleRetry}
          onNextLevel={handleNextLevel}
          highContrast={highContrast}
        />
      )}
    </div>
  )
}

export default App

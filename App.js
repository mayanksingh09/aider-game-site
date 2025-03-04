import React, { useState, useEffect } from 'react';

function App() {
  const [gameState, setGameState] = useState({ player1: 0, player2: 0, turn: 'player1' });

  useEffect(() => {
    fetch('/api/game')
      .then(response => response.json())
      .then(data => setGameState(data));
  }, []);

  const makeMove = (player) => {
    fetch('/api/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player })
    })
      .then(response => response.json())
      .then(data => setGameState(data));
  };

  return (
    <div>
      <h1>Two Player Game</h1>
      <p>Player 1: {gameState.player1}</p>
      <p>Player 2: {gameState.player2}</p>
      <p>Current Turn: {gameState.turn}</p>
      <button onClick={() => makeMove('player1')} disabled={gameState.turn !== 'player1'}>Player 1 Move</button>
      <button onClick={() => makeMove('player2')} disabled={gameState.turn !== 'player2'}>Player 2 Move</button>
    </div>
  );
}

export default App;

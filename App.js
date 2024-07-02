import React, {useState, useEffect } from 'react';

const diceFaces = [
  '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'
];

export function App(props) {
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    let timer;
    if (isRolling) {
      timer = setInterval(() => {
        const randomFace = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(randomFace);
      }, 100); // Change every 100ms for animation
      setTimeout(() => {
        clearInterval(timer);
        const finalNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(finalNumber);
        setIsRolling(false);
      }, 2000); // Animate for 2 seconds
    }
    return () => clearInterval(timer);
  }, [isRolling]);

  const rollDice = () => {
    setIsRolling(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="dice">
          {diceFaces[diceNumber - 1]}
        </div>
        <button onClick={rollDice} disabled={isRolling}>
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </header>
    </div>
  );
}


import React, {useState, useEffect } from 'react';

const diceFaces = [
  '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'
];

export function App(props) {
  const [diceNumber, setDiceNumber] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState([]);

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
        setRollHistory(prevHistory => [finalNumber, ...prevHistory]);
        setIsRolling(false);
      }, 2000); // Animate for 2 seconds
    }
    return () => clearInterval(timer);
  }, [isRolling]);

  const rollDice = () => {
    setIsRolling(true);
  };

  const resetHistory = () => {
    setRollHistory([]);
  };

  return (
    <div className="App">
      <div className="left-side">
        <div className="dice">
          {diceFaces[diceNumber - 1]}
        </div>
        <button onClick={rollDice} disabled={isRolling}>
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
      <div className="right-side">
        <h3>Roll History</h3>
        <button onClick={resetHistory}>Reset History</button>
        <ul>
          {rollHistory.map((roll, index) => (
            <li key={index}>{diceFaces[roll - 1]}</li>
          ))}
        </ul>

      </div>
    </div>
  );
}


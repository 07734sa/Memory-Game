import { useState } from 'react'
import './App.css';

const cardImg = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"},
]

function App() {
  const [cards, setCards] = useState([])

  // how many turns a user is taking to complete the game
  const [turns, setTurns] = useState(0) // counter beginns at 0

  // shuffle cards
  const shuffle = () => {
    const shuffledCards = [...cardImg, ...cardImg]    // duplicate cards
      .sort(() => Math.random() - 0.5) // negative number = order remains, else switch them around
      .map((card) => ({ ...card, id: Math.random()})) // add id for each card-object

    setCards(shuffledCards) //update state
    setTurns(0) // counter
  }

  console.log('Show cards: ', cards, 'show turns:', turns)

  return (
    <div className="App">
      <h1>My Memory</h1>
      <button onClick={shuffle}>New Game</button>

   
    </div>
  );
  
}
export default App;

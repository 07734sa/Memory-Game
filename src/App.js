import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';

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
  const [turns, setTurns] = useState(0)  // how many turns a user is taking to complete the game // counter beginns at 0
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

//------------------------------------------------------------

  // shuffle cards
  const shuffle = () => {
		const shuffledCards = [...cardImg, ...cardImg]    // duplicate cards
			.sort(() => Math.random() - 0.5) // negative number = order remains, else switch them around
			.map((card) => ({ ...card, id: Math.random()})) // add id for each card-object

		setCards(shuffledCards) //update state
		setTurns(0) // counter
  }
  //console.log('Show cards: ', cards, 'show turns:', turns)

  //-----------------------------------------------------------
  
  // handle choice
  const handleChoice = (card)  => {
		// om null = false så finns ett värde, annars true
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

	// ------------------------------------------------------------------------

  //compare two cards. avfyras inte förrän något har ändras 
	useEffect(() => {
		if (choiceOne && choiceTwo) {

			if (choiceOne.src === choiceTwo.src) {
				console.log('Yey, they match!')
				resetTurn()
			} else {
				console.log('No match :(')
				setChoiceOne(null)
				setChoiceTwo(null)
				setTurns(prevTurns => prevTurns + 1)
			}
		}
	}, [choiceOne, choiceTwo])

	//---------------------------------------------------------------------------

	// reset choices and increase turn with +1
	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns + 1)
	}
	//---------------------------------------------------------------------------


  return (
		<div className="App">
			<h1>My Memory</h1>
			<button onClick={shuffle}>New Game</button>

			<div className="card-grid">
				{cards.map(card => (

					<SingleCard 
						key={card.id} 
						card={card} 
						handleChoice={handleChoice}
					/>
				))}
			</div>
	</div>
  );
  
}
export default App;

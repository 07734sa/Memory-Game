import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';

const cardImg = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false},
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

  //compare two cards. avfyras inte förrän något har ändrats 
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			// if they match, update state. take prev state to update state. return a new array of cards- take prev cards and map a new array. fire a function
			if (choiceOne.src === choiceTwo.src) {
				//uppdate state
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src) {
							return {...card, matched: true}
						} else {
							return card
						}
					})
				})
				resetTurn()
			} else {
				setTimeout(()=> resetTurn(), 1000)
			}
		}
	}, [choiceOne, choiceTwo])

	console.log(cards)
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
						flipped={card === choiceOne || card === choiceTwo || card.matched}
					/>
				))}
			</div>
	</div>
  );
  
}
export default App;

import { useState, useEffect } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';
// import Alert from './components/Alert';

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
  const [disabled, setDisabled] = useState(false)
	const [showAlert, setShowAlert] = useState(true)
	console.log('SHOW ALERT', showAlert)
//------------------------------------------------------------

  // shuffle cards
  const shuffle = () => {
		const shuffledCards = [...cardImg, ...cardImg]    // duplicate cards
			.sort(() => Math.random() - 0.5) // negative number = order remains, else switch them around
			.map((card) => ({ ...card, id: Math.random()})) // add id for each card-object

		setChoiceOne(null) // IF a card is alreade selected
		setChoiceTwo(null)
		setCards(shuffledCards) //update state
		console.log(cards)
		setTurns(0) // counter
  }

  //-----------------------------------------------------------

  // handle choice
  const handleChoice = (card)  => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
		console.log(card)

  }

	// ------------------------------------------------------------------------
	// handle Alert button
	const handleAlertClick = () => {
		setShowAlert(false)
	}

// ------------------------------------------------------------------------

	
  //compare two cards. will fire if something has chnaged
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true)

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

	//---------------------------------------------------------------------------

	// reset choices and increase turn with +1
	const resetTurn = () => {
		setChoiceOne(null)
		setChoiceTwo(null)
		setTurns(prevTurns => prevTurns + 1)
		setDisabled(false)
	}
	//---------------------------------------------------------------------------

	// start new game automatically
	useEffect(()=> {
		shuffle()
	}, [])



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
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>

			{/* //! finish alert box */}
{/* 
			{showAlert && (
				<Alert>
					<h2>Awesome!</h2>
					<p>You made it in {turns} attemts</p>
					<button onClick= {handleAlertClick}>Play Again</button>
				</Alert>
			)} */}
		</div>
  );
  
}
export default App;

import { useEffect, useInsertionEffect } from 'react'
import singleCard from './SingleCard.css'

function SingleCard({ card, handleChoice }) {

	//här vill vi uppdatera state i choiseOne eller two i app.js
	const handleClick = () => {
		handleChoice(card)
	}



  return (
    <div className="card"> 
        <div>
        	<img className="front" src={card.src} alt="card front"/> {/** front side */}
        	<img className="back" 
				src="/img/cover.png" 
				onClick={handleClick}
				alt="card back" 
			/>
        </div>
    </div>
  )
}

export default SingleCard
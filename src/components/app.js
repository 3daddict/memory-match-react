// import React, { Component } from "react";
import React, { useState } from 'react';
import "../assets/css/app.css";
import Card from "./card";
import HighScoreList from "./highscorelist"
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faSpa,
  faAnchor,
  faCube,
  faDice,
  faBicycle,
  faLeaf
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faSpa, faAnchor, faCube, faDice, faBicycle, faLeaf);


const App = ()=>{
  const cardsToPopulate= [
    "heart",
    "anchor",
    "cube",
    "leaf",
    "dice",
    "bicycle",
    "heart",
    "anchor",
    "cube",
    "leaf",
    "dice",
    "bicycle"
  ];

  const [cardDeck, setCardDeck] = useState(cardsToPopulate);
  const [state, setState] = useState({
    cardRevealStates: new Array(cardDeck.length).fill(false),
    numberOfAttempts: 0,
    numberOfClicks: 0,
    gamesPlayed: 0,
    accuracy: 0,
    highScores: [5,20,25]
  });

    
  const _addHighScore =()=> {
    setState({
      ...state,
      highScores: [...state.highScores, state.numberOfAttempts].sort()
    });
    startNewGame();
  };
 
  const hideCards =(onSetState = () => {})=> {
    setTimeout(() => {
      setState(
        {
          ...state,
          cardRevealStates: new Array(cardDeck.length).fill(false),
          numberOfAttempts: numberOfAttempts+1
        },
        onSetState()
      );
    }, 500);

  }

  const removeMatches = (match)=> {
    hideCards(() => {
      setCardDeck(removeMatchedCardsFromList(match));
    });
    hideCards();
  }

  const isMatch =(cardsArr)=> {
    return cardsArr.every((val, i, arr) => val === arr[0]);
  }

  const getRevealedCards = () => {
    return cardDeck.filter((_, i) => state.cardRevealStates[i]);
  }

  const removeMatchedCardsFromList =(match) => {
    const removedCards = cardDeck.filter(card => card !== match);
    setState({
      ...state,
      cardRevealStates : removedCards
    })
    return removedCards;
  }

  const checkForMatch = () => {
    const revealedCards = getRevealedCards();

    if (revealedCards.length === 2) {
      if (isMatch(revealedCards)) {
        removeMatches(revealedCards[0]);
      }
      hideCards(() => {
        console.log(`where I want to be`);
        updateAccuracy();
      });
    }
    addNumberOfClicks();

    if (cardDeck.length < 3) {
       document.getElementById("gc").innerHTML =
        "Game Complete in " + state.numberOfAttempts + "   Attempts";
      document.getElementById("buttondiv").style.display = "none";
      if(cardDeck.length <1){
        startNewGame();
      }
    }
  }

    const handleClick = (index) => {
      const newRevealStates = state.cardRevealStates;
      
      newRevealStates[index] = true;
      
      console.log({newRevealStates});
      //cards actively flipped counter 
      let cardsFlipped = 0;
      
      //adds how many active cards flipped there are
      newRevealStates.forEach(function(el) {
        if (el === true) {
          cardsFlipped++;
        } else {
          return;
        }
      });

      //checks if only two cards are flipped
      if (cardsFlipped < 3) {
        //if only 2 are flipped it continues on
        setState({
          ...state,
          cardRevealStates: newRevealStates
        });

        checkForMatch();

        
      } else {
        //if more then two are it returns and doesn't let you flip another
        return;
      }
    }

    const addNumberOfClicks = () => {
      const { numberOfClicks } = state;
      const clicks = numberOfClicks + 1;

      ///accuracy
      const {numberOfAttempts} = state;
      const numPossibleCorrect = (cardsToPopulate.length-cardDeck.length)/2;
      const userAttempts = numberOfAttempts;
      const updateAccuracyRate = Math.floor((numPossibleCorrect/userAttempts)*100);


      (numPossibleCorrect>=1) ? 
        setState({
          ...state,
          numberOfClicks: clicks,
          accuracy: updateAccuracyRate
        })
        : 
        setState({
          ...state,
          numberOfClicks: clicks
        });
      console.log(`userAttempts are ${userAttempts} num possible is ${numPossibleCorrect}`);
      console.log({updateAccuracyRate});

    }
  
    //might not use item below 
    const updateAccuracy = () => {

      // let fakeAccuracy = 45;
      // setState({
      //   ...state,
      //   accuracy : fakeAccuracy
      // });
      console.log(`in accuracy`);
      const { numberOfClicks, numberOfAttempts } = state;
      // console.log({clicks});
      // const attempts = Math.floor(numberOfClicks / 2);

      const originalCardsLength = cardsToPopulate.length;
      const currentCardsLength = cardDeck.length;
      
      // console.log({originalCardsLength});
      // console.log({currentCardsLength});
      const revealedCards = Math.ceil(
        (originalCardsLength - currentCardsLength) / 2
      );
      const updateAccuracy = Math.floor(
        revealedCards ? (revealedCards / numberOfAttempts) * 100 : 0
      );
      console.log({updateAccuracy});
      console.log(`accuracy is ${accuracy}`);



      console.log({state});
    }

    const randomizeCards =(cards) => {
      var currentIndex = cards.length,
        temporaryValue,
        randomIndex;
  
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = cardDeck[currentIndex];
        cardDeck[currentIndex] = cardDeck[randomIndex];
        cardDeck[randomIndex] = temporaryValue;
      }
      console.log(`cards to be rerendered are ${cardDeck}`);
      renderCards(cardDeck);
    }
  
    const renderCards = () => {
      return cardDeck.map((icon, index) => (
        <Card
          key={`${icon}-${index}`}
          clickCallback={handleClick}
          index={index}
          icon={icon}
          display={state.cardRevealStates[index]}
        />
      ));
    }
  
    const startNewGame = () => {
      const { gamesPlayed } = state;
     
      setCardDeck([...cardsToPopulate]);
      // console.log(`card deck after new game ${cardDeck}`);
      // console.log(`cardDeck after new game ${cardDeck.length} and ${typeof(cardDeck)}`);
      setState({
        ...state,
        cardRevealStates: new Array(cardDeck.length).fill(false),
        numberOfAttempts: 0,
        numberOfClicks: 0,
        gamesPlayed: gamesPlayed + 1,
        accuracy: 0
      });

    }
  
  const {numberOfAttempts, gamesPlayed, accuracy} = state;

  return (
    <div className="App">
      <div className="col-1">
        <div className="links">
          <a href="#">Game</a>
          <a href="#">Contributors</a>
        </div>
      </div>
      <div className="col-2">
        <p id="gameStats">
          <span className="stat">Games Played: {gamesPlayed}</span>
          <span className="stat">Attempts: {numberOfAttempts}</span>
          <span className="stat">Accuracy: {accuracy}%</span>
        </p>
        
        <div className="gamecomplete">
          <p id="gc" />
        </div>

        <div id="gameArea">{renderCards()}</div>
        <div id="buttondiv">
          <button
            className="randomize-btn"
            onClick={() => randomizeCards(cardDeck)}
          >
            Randomize
          </button>
          <button className="startGame-btn" onClick={startNewGame}>
            Start New Game
          </button>
          <button className="startGame-btn" onClick={_addHighScore} disabled={state.cardRevealStates.length}>
            Add High Score
          </button>
          <div>
            Status
            <ul>
              <li>State Attempts {state.numberOfAttempts}</li>
              <li>State Clicks {state.numberOfClicks}</li>
              <li>State Accuracy {state.accuracy}</li>
              <li>State CardsRevealed {state.cardRevealStates.length}</li>
            </ul>
          </div>
        </div>
      </div>
      <HighScoreList className="col-3" scores={state.highScores} />
    </div>
  );
    
}

export default App;
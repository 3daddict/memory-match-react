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
    
  let cards = [...cardsToPopulate];
  
  // const [cards, setCards] = useState(cardsToPopulate);
  // const [cardRevealStates, setCardRevealStates] = useState(new Array(cards.length).fill(false));
  // const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  // const [numberOfClicks, setNumberOfClicks] = useState(0);
  // const [gamesPlayed, setGamesPlayed] = useState(1);
  // const [accuracy, setAccuracy] = useState(0);
  // const [highScores, setHighScores] = [];

  const [state, setState] = useState({
    cardRevealStates: new Array(cards.length).fill(false),
    numberOfAttempts: 0,
    numberOfClicks: 0,
    gamesPlayed: 1,
    accuracy: 0,
    highScores: []
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
          cardRevealStates: new Array(cards.length).fill(false)
        },
        onSetState()
      );
    }, 500);
  }

  const removeMatches = (match)=> {
    hideCards(() => {
      cards = removeMatchedCardsFromList(match);
    });
  }

  const isMatch =(cardsArr)=> {
    return cardsArr.every((val, i, arr) => val === arr[0]);
  }

  const getRevealedCards = () => {
    return cards.filter((_, i) => state.cardRevealStates[i]);
  }

  const removeMatchedCardsFromList =(match) => {
    return cards.filter(card => card !== match);
  }

  const addNumberOfAttempts = () => {
    setState(prevState => ({
      ...state,
      numberOfAttempts: prevState.numberOfAttempts + 1
    }));
  }

  const checkForMatch = () => {
    const revealedCards = getRevealedCards();
    if (revealedCards.length === 2) {
      if (isMatch(revealedCards)) {
        removeMatches(revealedCards[0]);
      }
        hideCards(() => {
        updateAccuracy();
      });
    }
    if (cards.length == 0) {
      document.getElementById("gc").innerHTML =
        "Game Complete in " + state.numberOfAttempts + "   Attempts";
      document.getElementById("buttondiv").style.display = "none";
    }
  }

    const handleClick = (index) => {
      console.log({index});
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

        addNumberOfClicks();
      } else {
        //if more then two are it returns and doesn't let you flip another
        return;
      }
    }

    const addNumberOfClicks = () => {
      const { numberOfClicks } = state;
      const clicks = numberOfClicks + 1;
      const attempts = Math.floor(clicks / 2);
      setState({
        ...state,
        numberOfClicks: clicks,
        numberOfAttempts: attempts
      });
    }
  
    const updateAccuracy = () => {
      const { numberOfClicks } = state;
      const clicks = numberOfClicks + 1;
      const attempts = Math.floor(clicks / 2);
      const originalCardsLength = cardsToPopulate.length;
      const currentCardsLength = cards.length;
      const revealedCards = Math.ceil(
        (originalCardsLength - currentCardsLength) / 2
      );
      const accuracy = Math.floor(
        revealedCards ? (revealedCards / attempts) * 100 : 0
      );
  
      setState({
        ...state,
        accuracy: accuracy
      });
    }

    const randomizeCards =(cards) => {
      var currentIndex = cards.length,
        temporaryValue,
        randomIndex;
  
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
  
      renderCards(cards);
    }
  
    const renderCards = () => {
      console.log(`I am here ${cards}`);
      return cards.map((icon, index) => (
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
      cards = [...cardsToPopulate];
      setState({
        cardRevealStates: new Array(cards.length).fill(false),
        gamesPlayed: gamesPlayed + 1,
        accuracy: 0,
        numberOfAttempts: 0,
        numberOfClicks: 0
      });
    }
  
  const {numberOfAttempts, gamesPlayed, accuracy} = state;
  console.log({state});
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
            onClick={() => randomizeCards(cards)}
          >
            Randomize
          </button>
          <button className="startGame-btn" onClick={startNewGame}>
            Start New Game
          </button>
          <button className="startGame-btn" onClick={_addHighScore} disabled={state.cardRevealStates.length}>
            Add High Score
          </button>
        </div>
      </div>
      <HighScoreList className="col-3" scores={state.highScores} />
    </div>
  );
    
}


// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.cardsToPopulate = [
//       "heart",
//       "anchor",
//       "cube",
//       "leaf",
//       "dice",
//       "bicycle",
//       "heart",
//       "anchor",
//       "cube",
//       "leaf",
//       "dice",
//       "bicycle"
//     ];
//     this.cards = [...this.cardsToPopulate];

//     this.state = {
//       cardRevealStates: new Array(this.cards.length).fill(false),
//       numberOfAttempts: 0,
//       numberOfClicks: 0,
//       gamesPlayed: 1,
//       accuracy: 0,
//       highScores: []
//     };
//     console.log(this.state.cardRevealStates);
    

//     this.handleClick = this.handleClick.bind(this);
//     this.startNewGame = this.startNewGame.bind(this);
//     this.addNumberOfClicks = this.addNumberOfClicks.bind(this);
//     this._addHighScore = this._addHighScore.bind(this);
//   }


//   _addHighScore() {
//     this.setState({
//       highScores: [...this.state.highScores, this.state.numberOfAttempts].sort()
//     })
//     this.startNewGame()
//   }

//   render() {
//     const { numberOfAttempts, gamesPlayed, accuracy } = this.state;
//     return (
//       <div className="App">
//         <div className="col-1">
//           <div className="links">
//             <a href="#">Game</a>
//             <a href="#">Contributors</a>
//           </div>
//         </div>
//         <div className="col-2">
//           <p id="gameStats">
//             <span className="stat">Games Played: {gamesPlayed}</span>
//             <span className="stat">Attempts: {numberOfAttempts}</span>
//             <span className="stat">Accuracy: {accuracy}%</span>
//           </p>
          
//           <div className="gamecomplete">
//             <p id="gc" />
//           </div>

//           <div id="gameArea">{this.renderCards()}</div>
//           <div id="buttondiv">
//             <button
//               className="randomize-btn"
//               onClick={() => this.randomizeCards(this.cards)}
//             >
//               Randomize
//             </button>
//             <button className="startGame-btn" onClick={this.startNewGame}>
//               Start New Game
//             </button>
//             <button className="startGame-btn" onClick={this._addHighScore} disabled={this.state.cardRevealStates.length}>
//               Add High Score
//             </button>
//           </div>
//         </div>
//         <HighScoreList className="col-3" scores={this.state.highScores} />
//       </div>
//     );
//   }


//   hideCards(onSetState = () => {}) {
//     setTimeout(() => {
//       this.setState(
//         {
//           cardRevealStates: new Array(this.cards.length).fill(false)
//         },
//         onSetState()
//       );
//     }, 500);
//   }
//   removeMatches(match) {
//     this.hideCards(() => {
//       this.cards = this.removeMatchedCardsFromList(match);
//     });
//   }

//   isMatch(cardsArr) {
//     return cardsArr.every((val, i, arr) => val === arr[0]);
//   }

//   getRevealedCards() {
//     return this.cards.filter((_, i) => this.state.cardRevealStates[i]);
//   }

//   removeMatchedCardsFromList(match) {
//     return this.cards.filter(card => card !== match);
//   }

//   addNumberOfAttempts() {
//     this.setState(prevState => ({
//       numberOfAttempts: prevState.numberOfAttempts + 1
//     }));
//   }

//   checkForMatch() {
//     const revealedCards = this.getRevealedCards();
//     if (revealedCards.length === 2) {
//       if (this.isMatch(revealedCards)) {
//         this.removeMatches(revealedCards[0]);
//       }
//       this.hideCards(() => {
//         this.updateAccuracy();
//       });
//     }
//     if (this.cards.length == 0) {
//       document.getElementById("gc").innerHTML =
//         "Game Complete in " + this.state.numberOfAttempts + "   Attempts";
//       document.getElementById("buttondiv").style.display = "none";
//       //   console.log(
//       //     "Game Complete in" + this.state.numberOfAttempts + "attempts"
//       //   );
//     }
//   }

//   handleClick(index) {
//     const newRevealStates = this.state.cardRevealStates;
//     newRevealStates[index] = true;
//     //cards actively flipped counter 
//     let cardsFlipped = 0;
    
//     //adds how many active cards flipped there are
//     newRevealStates.forEach(function(el) {
//       if (el === true) {
//         cardsFlipped++;
//       } else {
//         return;
//       }
//     });

//     //checks if only two cards are flipped
//     if (cardsFlipped < 3) {
//       //if only 2 are flipped it continues on
//       this.setState({
//         cardRevealStates: newRevealStates
//       });

//       this.checkForMatch();

//       this.addNumberOfClicks();
//     } else {
//       //if more then two are it returns and doesn't let you flip another
//       return;
//     }

    
//   }

//   addNumberOfClicks() {
//     const { numberOfClicks } = this.state;
//     const clicks = numberOfClicks + 1;
//     const attempts = Math.floor(clicks / 2);
//     this.setState({
//       numberOfClicks: clicks,
//       numberOfAttempts: attempts
//     });
//   }

//   updateAccuracy() {
//     const { numberOfClicks } = this.state;
//     const clicks = numberOfClicks + 1;
//     const attempts = Math.floor(clicks / 2);
//     const originalCardsLength = this.cardsToPopulate.length;
//     const currentCardsLength = this.cards.length;
//     const revealedCards = Math.ceil(
//       (originalCardsLength - currentCardsLength) / 2
//     );
//     const accuracy = Math.floor(
//       revealedCards ? (revealedCards / attempts) * 100 : 0
//     );

//     this.setState({
//       accuracy: accuracy
//     });
//   }

//   randomizeCards(cards) {
//     var currentIndex = cards.length,
//       temporaryValue,
//       randomIndex;

//     while (0 !== currentIndex) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;

//       temporaryValue = cards[currentIndex];
//       cards[currentIndex] = cards[randomIndex];
//       cards[randomIndex] = temporaryValue;
//     }

//     this.renderCards(cards);
//   }

//   renderCards() {
//     return this.cards.map((icon, index) => (
//       <Card
//         key={`${icon}-${index}`}
//         clickCallback={this.handleClick}
//         index={index}
//         icon={icon}
//         display={this.state.cardRevealStates[index]}
//       />
//     ));
//   }

//   startNewGame() {
//     const { gamesPlayed } = this.state;
//     this.cards = [...this.cardsToPopulate];
//     this.setState({
//       cardRevealStates: new Array(this.cards.length).fill(false),
//       gamesPlayed: gamesPlayed + 1,
//       accuracy: 0,
//       numberOfAttempts: 0,
//       numberOfClicks: 0
//     });
//     console.log(this.cards);
//   }
// }

export default App;
import React, { Component } from "react";
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

class App extends Component {
  constructor(props) {
    super(props);

    this.cardsToPopulate = [
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
    this.cards = [...this.cardsToPopulate];

    this.state = {
      cardRevealStates: new Array(this.cards.length).fill(false),
      numberOfAttempts: 0,
      numberOfClicks: 0,
      gamesPlayed: 1,
      accuracy: 0,
      highScores: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.addNumberOfClicks = this.addNumberOfClicks.bind(this);
    this._addHighScore = this._addHighScore.bind(this);
  }


  _addHighScore() {
    this.setState({
      highScores: [...this.state.highScores, this.state.numberOfAttempts].sort()
    })
    this.startNewGame()
  }

  render() {
    const { numberOfAttempts, gamesPlayed, accuracy, cardRevealStates, highScores } = this.state;
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

          <div id="gameArea">{this.renderCards()}</div>
          <div id="buttondiv">
            <button
              className="randomize-btn"
              onClick={this.randomizeCards}
            >
              Randomize
            </button>
            <button className="startGame-btn" onClick={this.startNewGame}>
              Start New Game
            </button>
            <button className="startGame-btn" onClick={this._addHighScore} disabled={cardRevealStates.length}>
              Add High Score
            </button>
          </div>
        </div>
        <HighScoreList className="col-3" scores={highScores} />
      </div>
    );
  }


  hideCards(onSetState = () => {}) {
    setTimeout(() => {
      this.setState(
        {
          cardRevealStates: new Array(this.cards.length).fill(false)
        },
        onSetState()
      );
    }, 500);
  }
  removeMatches(match) {
    this.hideCards(() => {
      this.cards = this.removeMatchedCardsFromList(match);
    });
  }

  isMatch(cardsArr) {
    return cardsArr.every((val, i, arr) => val === arr[0]);
  }

  getRevealedCards() {
    return this.cards.filter((_, i) => this.state.cardRevealStates[i]);
  }

  removeMatchedCardsFromList(match) {
    return this.cards.filter(card => card !== match);
  }

  addNumberOfAttempts() {
    this.setState(prevState => ({
      numberOfAttempts: prevState.numberOfAttempts + 1
    }));
  }

  checkForMatch() {
    const revealedCards = this.getRevealedCards();
    if (revealedCards.length === 2) {
      if (this.isMatch(revealedCards)) {
        this.removeMatches(revealedCards[0]);
      }
      this.hideCards(() => {
        this.updateAccuracy();
      });
    }
    if (this.cards.length == 0) {
      document.getElementById("gc").innerHTML =
        "Game Complete in " + this.state.numberOfAttempts + "   Attempts";
      document.getElementById("buttondiv").style.display = "none";
    }
  }

  handleClick(index) {
    const newRevealStates = this.state.cardRevealStates;
    newRevealStates[index] = true;
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

    this.checkForMatch();
    this.addNumberOfClicks();
  }

  addNumberOfClicks() {
    const { numberOfClicks } = this.state;
    const clicks = numberOfClicks + 1;
    const attempts = Math.floor(clicks / 2);
    this.setState({
      numberOfClicks: clicks,
      numberOfAttempts: attempts
    });
  }

  updateAccuracy() {
    const { numberOfClicks } = this.state;
    const clicks = numberOfClicks + 1;
    const attempts = Math.floor(clicks / 2);
    const originalCardsLength = this.cardsToPopulate.length;
    const currentCardsLength = this.cards.length;
    const revealedCards = Math.ceil(
      (originalCardsLength - currentCardsLength) / 2
    );
    const accuracy = Math.floor(
      revealedCards ? (revealedCards / attempts) * 100 : 0
    );

    this.setState({
      accuracy: accuracy
    });
  }

  randomizeCards() {
    var currentIndex = this.cards.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }

    this.renderCards();
  }

  renderCards() {
    return this.cards.map((icon, index) => (
      <Card
        key={`${icon}-${index}`}
        clickCallback={this.handleClick}
        index={index}
        icon={icon}
        display={this.state.cardRevealStates[index]}
      />
    ));
  }

  startNewGame() {
    const { gamesPlayed } = this.state;
    this.cards = [...this.cardsToPopulate];
    this.setState({
      cardRevealStates: new Array(this.cards.length).fill(false),
      gamesPlayed: gamesPlayed + 1,
      accuracy: 0,
      numberOfAttempts: 0,
      numberOfClicks: 0
    });
  }
}

export default App;

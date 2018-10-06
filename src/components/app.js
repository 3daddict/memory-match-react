import React, { Component } from "react";
import "../assets/css/app.css";
import Card from "./card";
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
            gamesPlayed: 1
        };
        console.log(this.state.cardRevealStates);

        this.handleClick = this.handleClick.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
    }
    render() {
        const {numberOfAttempts, gamesPlayed} = this.state;
        this.checkForMatch();
        return (
            <div className="App">
                <p id="gameStats">
                    <span className="stat">Games Played: {gamesPlayed}</span>
                    <span className="stat">Attempts: {numberOfAttempts}</span>
                </p>
                <div id="gameArea">
                    {this.renderCards()}
                    <button
                        className="randomize-btn"
                        onClick={() => this.randomizeCards(this.cards)}
                    >
                        Randomize
                    </button>
                    <button
                        className="startGame-btn"
                        onClick={this.startNewGame}
                    >
                        Start New Game
                    </button>
                </div>
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

    checkForMatch() {
        const revealedCards = this.getRevealedCards();
        if (revealedCards.length === 2) {
            if (this.isMatch(revealedCards)) {
                this.removeMatches(revealedCards[0]);
            }
            this.hideCards();
        }
    }

    handleClick(index) {
        const newRevealStates = this.state.cardRevealStates;
        newRevealStates[index] = true;

        this.setState({
            cardRevealStates: newRevealStates
        });

        console.log("Clicked");
        this.addNumberOfClicks();
    }

    addNumberOfClicks() {
        const {numberOfClicks} = this.state;
        const clicks = numberOfClicks + 1;
        const attempts = Math.floor(clicks / 2);

        this.setState({
          numberOfClicks: clicks,
          numberOfAttempts: attempts
        });
    }

    randomizeCards(cards) {
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

        this.renderCards(cards);
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
        const {gamesPlayed} = this.state;
        this.cards = [...this.cardsToPopulate];
        this.setState({
            cardRevealStates: new Array(this.cards.length).fill(false),
            gamesPlayed: gamesPlayed + 1,
            numberOfAttempts: 0
        });
    }
}

export default App;

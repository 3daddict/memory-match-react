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

        this.cards = [
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

        this.state = {
            cardRevealStates: new Array(this.cards.length).fill(false),
            numberOfAttempts: 0
        };
        console.log(this.state.cardRevealStates);

        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        this.checkForMatch();
        return (
            <div className="App">
                <h1 id="numberOfAttempts">
                    {this.state.numberOfAttempts} - Attempts
                </h1>
                <div className="gamecomplete">
                    <p id="gc"></p>
                </div>
                <div id="gameArea">
                    {this.renderCards()}
                </div>
                <div id="buttondiv">
                    <button
                            className="randomize-btn"
                            onClick={() => this.randomizeCards(this.cards)}>
                            Randomize
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

    addNumberOfAttempts() {
        this.setState(prevState=>({numberOfAttempts:prevState.numberOfAttempts+1}));
    }

    checkForMatch() {
        const revealedCards = this.getRevealedCards();
        if (revealedCards.length === 2) {
            if (this.isMatch(revealedCards)) {
                this.removeMatches(revealedCards[0]);
            }
            this.hideCards();
        }
        if(this.cards.length==0){
            document.getElementById("gc").innerHTML="Game Complete in " + this.state.numberOfAttempts + "   Attempts";    
            document.getElementById("numberOfAttempts").style.display="none";
            document.getElementById("buttondiv").style.display="none";
            console.log("Game Complete in" + this.state.numberOfAttempts + "attempts");
        }
    }

    handleClick(index) {
        const newRevealStates = this.state.cardRevealStates;
        newRevealStates[index] = true;

        this.setState({
            cardRevealStates: newRevealStates
        });

        console.log("Clicked");
        this.addNumberOfAttempts();
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
}

export default App;

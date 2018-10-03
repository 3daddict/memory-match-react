import React, {Component} from 'react';
import '../assets/css/app.css';
import Card from  './card';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faSpa, faAnchor, faCube, faDice, faBicycle, faLeaf  } from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faSpa, faAnchor, faCube, faDice, faBicycle, faLeaf);

class App extends Component {
    constructor(props){
        super(props);

        this.cards = ['heart', 'anchor', 'cube','leaf','dice','bicycle','heart', 'anchor', 'cube','leaf','dice','bicycle'];

        this.state = {
            cardRevealStates: new Array(this.cards.length).fill(false)
        }
        console.log(this.state.cardRevealStates);

        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        this.checkForMatch();
        return (
            <div className="App">
                <div id="gameArea">
                    {this.renderCards()}
                </div>
            </div>
        );
    }

    hideCards(onSetState = () => {}) {
        setTimeout(() => {
            this.setState({
                cardRevealStates: new Array(this.cards.length).fill(false)
            }, onSetState())
        }, 500)
    }

    removeMatches(match) {
        this.hideCards(() => {
            this.cards = this.removeMatchedCardsFromList(match)
        })
    }

    isMatch(cardsArr) {
        return cardsArr.every((val, i, arr) => val === arr[0])
    }

    getRevealedCards() {
        return this.cards.filter((_, i) => this.state.cardRevealStates[i]);
    }

    removeMatchedCardsFromList(match) {
        return this.cards.filter(card => card !== match)
    }

    checkForMatch() {
        const revealedCards = this.getRevealedCards()
        if (revealedCards.length === 2) {
            if (this.isMatch(revealedCards)) {
                this.removeMatches(revealedCards[0])
            }
            this.hideCards()
        }
    }

    handleClick(index){
        const newRevealStates = this.state.cardRevealStates;
        newRevealStates[index] = true;

        this.setState({
            cardRevealStates: newRevealStates
        })

        console.log('Clicked')
    }

    renderCards(){
        return this.cards.map((icon, index) => 
            <Card key={`${icon}-${index}`} clickCallback={this.handleClick} index={index} icon={icon} display={this.state.cardRevealStates[index]} />
        )
    }
}

export default App;

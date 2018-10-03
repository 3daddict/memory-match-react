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
        this.currentSelections = [];

        this.state = {
            cardRevealStates: new Array(this.cards.length).fill(false)
        }
        console.log(this.state.cardRevealStates);

        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        return (
            <div className="App">
                <div id="gameArea">
                    {this.renderCards()}
                </div>
            </div>
        );
    }

    checkMatch(index) {
        // currentSelections maintains information about the last two card clicks
        let currentSelections = this.currentSelections;
        const { cardRevealStates } = this.state;
        
        currentSelections.push({card:this.cards[index], index});

        if(currentSelections.length === 2) {
            // Adding a delay of 500ms for the user to see the flip side of both the selections
            setTimeout(() => {
                if(currentSelections[0].card === currentSelections[1].card) {
                    // Splicing the cards in reverse order so that there is no index mismatch
                    if(currentSelections[0].index > currentSelections[1].index) {
                        this.cards.splice(currentSelections[0].index,1);
                        this.cards.splice(currentSelections[1].index,1);
                    } else {
                        this.cards.splice(currentSelections[1].index,1);
                        this.cards.splice(currentSelections[0].index,1);
                    } 
                }

                cardRevealStates[currentSelections[0].index] = false;
                cardRevealStates[currentSelections[1].index] = false;

                this.currentSelections = [];

                this.setState({
                    cardRevealStates
                });
            },500);
        }
    }

    handleClick(index){
        const newRevealStates = this.state.cardRevealStates;
        newRevealStates[index] = true;

        this.setState({
            cardRevealStates: newRevealStates
        })

        this.checkMatch(index);
        console.log('Clicked');
    }

    renderCards(){
        return this.cards.map((icon, index) => 
            <Card key={index} clickCallback={this.handleClick} index={index} icon={icon} display={this.state.cardRevealStates[index]} />
        )
    }
}

export default App;

import React, {Component} from 'react';
import '../assets/css/app.css';
import Card from  './card';

class App extends Component {
    constructor(props){
        super(props);

        this.cards = ['red', 'blue', 'red']

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

    handleClick(index){
        const newRevealStates = this.state.cardRevealStates;
        newRevealStates[index] = true;

        this.setState({
            cardRevealStates: newRevealStates
        })

        console.log('Clicked')
    }

    renderCards(){
        return this.cards.map((color, index) => 
            <Card key={index} clickCallback={this.handleClick} index={index} color={color} display={this.state.cardRevealStates[index]} />
        )
    }
}

export default App;

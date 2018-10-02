import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Card(props){
    function cardHandleClick(){
        props.clickCallback(props.index);
    }

    return <div className="card" onClick={cardHandleClick.bind(this)}>
                <div className="front" style={{
                    backgroundColor: props.color,
                    width: '100%',
                    height: '100%'}} />
                <div className="back" style={{
                    backgroundColor: 'lavender',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    display: props.display ? 'none' : 'block'
                    }} ><FontAwesomeIcon icon="spa" size="5x" style={{position: 'absolute',left:'30%',top:'20%'}}/></div>
            </div>
}

export default Card;

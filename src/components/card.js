import React from 'react';

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
                    }} />
            </div>
}

export default Card;

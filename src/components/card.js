import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../assets/css/card.css";

const Card = ({
    clickCallback,
    display,
    icon,
    index
}) => {
    const cardHandleClick = () => {
        clickCallback(index);
    }

    return (
        <div className="card" onClick={cardHandleClick}>
            <div className="front">
                <FontAwesomeIcon className="front-icon" icon={icon} size="5x" />
                <div className="back-icon" style={{display: display ? 'none' : 'block'}}>
                    <FontAwesomeIcon className="front-icon-spa" icon="spa" size="5x" />
                </div>
            </div>
        </div>
    );
}

export default Card;

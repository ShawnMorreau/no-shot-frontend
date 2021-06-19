import React from "react";
import "./Card.css"
const Card = ({ value, type, selectCard, clicked }) => {
    return (
        <li onClick={clicked} className={`${type} card`}>
            <p style={{pointerEvents:"none"}}>{value}</p>
        </li>
    )
}

export default Card;
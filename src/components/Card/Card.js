import React from "react";
import "./Card.css"
const Card = ({value, type, selectCard}) => {
    return(
        <li onClick={()=>selectCard(value,type)}className={`${type} card`}>
            <p>{value}</p>
        </li>
    )
}

export default Card;
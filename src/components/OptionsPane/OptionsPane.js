import React from "react";
import "./Options.css"
const OptionsPane = ({selectOption}) => {
  const clicked = option => {
      selectOption(option);
  }  
  return (
    <div className="optionsButtons">
      <button onClick={()=>clicked("continue")}>Keep going</button>
      <button onClick={()=>clicked("end")}>End it here</button>
    </div>
  );
};

export default OptionsPane;

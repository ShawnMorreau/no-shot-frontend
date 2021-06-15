import React from "react";

const OptionsPane = ({selectOption}) => {
  const clicked = option => {
      selectOption(option);
  }  
  return (
    <>
      <h3>Let's see... you got a couple options here</h3>
      <button onClick={()=>clicked("continue")}>Keep going</button>
      <button onClick={()=>clicked("end")}>End it here</button>
    </>
  );
};

export default OptionsPane;

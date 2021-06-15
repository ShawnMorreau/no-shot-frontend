import React from "react";
import "./ChatHistory.css";

const ChatHistory = (props) => { 
  const messages = props.chatHistory.map((msg, idx) => {
    return <li key={idx}>{msg}</li>;
  });

  return (
    <div className="ChatHistory">
      <h2>Chat History</h2>
      <ul>{messages}</ul>
    </div>
  );
};

export default ChatHistory;

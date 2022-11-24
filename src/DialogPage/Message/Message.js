import React, {useState} from "react";
import './Message.css';

function Message ({text, senderName, topic, date}) {
  const [toggleText, setToggleText] = useState(false);

  return (
    <div className="container message">
      <div><b>From: {senderName}</b></div>
      <div onClick={() =>setToggleText(!toggleText)}><i>About: {topic} (click to expend)</i></div>
      {toggleText && <div>{text}</div>}
      <div>{date}</div>      
    </div>
  )
}

export default Message;
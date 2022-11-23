import React, { useState } from "react";
import './DialogPage.css';
import socket from "../socket";

function DialogPage({ users, messages, senderName, recipientName, onAddMessage }) {
  const [messageValue, setMessageValue] = useState('');
  
  

  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      senderName,
      recipientName,
      text: messageValue
    });
    onAddMessage({senderName, text: messageValue});
    setMessageValue('');
  };

 

  return (
    <main className="container ">      
      <div className="form-floating mb-3 w-75">
        <input
          type="text"
          className="form-control"
          id="topic"
          placeholder="topic"
        />
        <label for="topic">Topic</label>
      </div>
      <div className="form-floating mb-3 w-100">
        <textarea
          value={messageValue}
          className="form-control"
          placeholder="Your message"
          id="message"
          onChange={(e) => setMessageValue(e.target.value)}
        />
        <label for="message">Your message</label>
      </div>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={onSendMessage}
      >
        Send
      </button>
      <div>
        {messages.map((message) => (
          <>
            <p>{message.text}</p>
            <div>
              <span>{message.senderName}</span>
            </div>
            </>
        ))}
      </div>
    </main>
  )
}

export default DialogPage;
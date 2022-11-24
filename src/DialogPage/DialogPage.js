import React, { useState } from "react";
import './DialogPage.css';
import socket from "../socket";
import Message from "./Message/Message";

function DialogPage({ messages, senderName, recipientName, onAddMessage }) {
  const [messageValue, setMessageValue] = useState('');
  const [topicValue, setTopicValue] = useState('');
  
  const onSendMessage = () => {
    if (!messageValue || !topicValue) {
      return alert('Please, fill in both fields!')
    }
    let messageDate = new Date().toLocaleString();
    socket.emit('ROOM:NEW_MESSAGE', {
      senderName,
      recipientName,
      text: messageValue,
      topic: topicValue,
      date: messageDate
    });
    onAddMessage({senderName, text: messageValue, topic: topicValue, date: messageDate});
    setMessageValue('');
    setTopicValue('');
  }; 

  return (
    <main className="container ">      
      <div className="form-floating mb-3 w-75">
        <input
          value={topicValue}
          type="text"
          className="form-control"
          id="topic"
          placeholder="topic"
          onChange={(e) => setTopicValue(e.target.value)}
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
      <div className="w-100">
        {messages.map((message) => (
          <Message text={message.text} senderName={message.senderName} topic={message.topic} date={message.date} />
        ))}
      </div>
    </main>
  )
}

export default DialogPage;
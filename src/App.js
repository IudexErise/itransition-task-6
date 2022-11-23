import React, { useReducer, useEffect } from 'react';
import LoginPage from './LoginPage/LoginPage';
import './App.css';
import reducer from './reducer';
import socket from './socket';
import DialogPage from './DialogPage/DialogPage';
import axios from 'axios';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    senderName: null,
    recipientName: null,
    users: [],
    messages: []
  });

  const onSignIn = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.recipientName}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };


  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);

  window.socket = socket;

  return (
    <main className="text-center">
      {!state.joined ? (
        <LoginPage onSignIn={onSignIn} />
       ) : (
        <DialogPage {...state} onAddMessage={addMessage} />
      )}
    </main>
  );
}

export default App;

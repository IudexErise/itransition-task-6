import React, { useReducer, useEffect } from 'react';
import LoginPage from './LoginPage/LoginPage';
import './App.css';
import reducer from './reducer';
import socket from './socket';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    senderName: null,
    recipientName: null,
    users: [],
    messages: []
  });

  const onSignIn = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    });
    socket.emit('ROOM:JOIN', obj);
  };
  

  useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      dispatch({
        type: 'SET_USERS',
        payload: users
      })
    });
  }, [])

  return (
    <main className="text-center">
      {!state.joined && <LoginPage onSignIn={onSignIn} />}
    </main>
  );
}

export default App;

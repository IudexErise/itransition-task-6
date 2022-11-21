import React, { useReducer } from 'react';
import LoginPage from './LoginPage/LoginPage';
import './App.css';
import reducer from './reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
  });

  const onSignIn = () => {
    dispatch({
      type: 'IS_AUTHENTICATED',
      payload: true
    });
  };

  return (
    <main className="text-center">
      {!state.isAuthenticated && <LoginPage onSignIn={onSignIn} />}
    </main>
  );
}

export default App;

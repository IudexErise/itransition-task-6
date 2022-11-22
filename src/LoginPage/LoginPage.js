import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';

function LoginPage({ onSignIn }) {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onEnter = async () => {
    if (!senderName || !recipientName) {
      return alert('Please, fill in both inputs!')
    }
    setLoading(true);
    const obj = {
      senderName,
      recipientName
    };
    setLoading(true);
    await axios.post('/rooms', obj);
    onSignIn(obj);
  };

  return (
    <div className="form-signin w-100 m-auto">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="from"
            value={senderName}
            onChange={e => setSenderName(e.target.value)}
          />
          <label for="from">Your name</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="to"
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
          />
          <label for="to">Name of recipient</label>
        </div>
        <br />
        <button
          className="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={onEnter}
          disabled={isLoading}
        >
          {isLoading ? 'Starting chat' : 'Start chat'}
        </button>
        <br />
        <p className="mt-5 mb-3 text-muted">&copy; V.Saprykin 2022</p>
      </form>
    </div>
  );
}

export default LoginPage;

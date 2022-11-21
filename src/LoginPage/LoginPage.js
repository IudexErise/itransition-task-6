import React from 'react';
import './LoginPage.css';
import socket from '../socket';

function LoginPage() {
  return (
    <div className="form-signin w-100 m-auto">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input type="text" className="form-control" id="from" />
          <label for="from">Your name</label>
        </div>
        <br />
        <div className="form-floating">
          <input type="text" className="form-control" id="to" />
          <label for="to">Name of recipient</label>
        </div>
        <br />
        <button className="w-100 btn btn-lg btn-primary" type="submit">Start chat</button>
        <br />
        <p className="mt-5 mb-3 text-muted">&copy; V.Saprykin 2022</p>
      </form>
    </div>
  );
}

export default LoginPage;

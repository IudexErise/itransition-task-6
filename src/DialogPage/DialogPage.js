import React from "react";
import './DialogPage.css';

function DialogPage() {
  return (
    <main className="container ">
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="topic" placeholder="Topic" />
        <label for="topic">Topic</label>
      </div>
      <div className="form-floating mb-3">
        <textarea className="form-control" placeholder="Your message..." id="message" />
        <label for="message">Your message...</label>
      </div>
      <button type="button" className="btn btn-outline-primary">Send</button>
      <div>Messages</div>
    </main>
  )
}

export default DialogPage;
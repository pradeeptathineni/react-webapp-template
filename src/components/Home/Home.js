import React from "react";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h5>What did we do?</h5>
        <ul>
          <li>create-react-app + react = front-end React.js web-app</li>
          <li>react-router = single-page application (for the most part)</li>
          <li>express = back-end web-server to serve API endpoints</li>
          <li>
            react-bootstrap = existing components and theme for ease of
            integration and mobile responsiveness
          </li>
          <li>morgan + winston = logging</li>
        </ul>
        <h5>What do we need next</h5>
        <ul>
          <li>cognito + private routing = full-stack authentication</li>
          <li>This is the Home page - entice the viewer</li>
        </ul>
      </div>
    );
  }
}

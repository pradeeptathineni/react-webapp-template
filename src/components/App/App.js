import React, { useState, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  Switch,
} from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import NavTopBar from "../NavTopBar";
import Home from "../Home";
import UserHome from "../UserHome";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Example from "../Example";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalContent: null,
      showModal: false,
    };
  }

  setModalContent = (modalContent) => {
    this.setState({ modalContent, showModal: true });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <Router>
        <Navigation setModalContent={this.setModalContent} />
        <Content setModalContent={this.setModalContent} />
        <Footer setModalContent={this.setModalContent} />
        <Modal
          size="lg"
          show={this.state.showModal}
          onHide={this.closeModal}
          centered
        >
          {this.state.modalContent}
        </Modal>
      </Router>
    );
  }
}

const Navigation = (navigationProps) => (
  <div id="Navigation">
    <NavTopBar {...navigationProps} />
  </div>
);

const Footer = () => (
  <div id="Footer">
    <span>This website uses HaveIBeenPwned and other sources</span>
    <span>Last Published April 2020, © AP Inc.</span>
  </div>
);

const NoMatch = () => <h3>404. You requested a page that does not exist</h3>;

const Content = (contentProps) => {
  return (
    <div id="Content" style={{ minHeight: window.innerHeight }}>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home {...props} {...contentProps} />}
        />
        <Route
          exact
          path="/user"
          render={(props) => <UserHome {...props} {...contentProps} />}
        />
        <Route
          exact
          path="/example"
          render={(props) => (
            <Example
              {...props}
              {...contentProps}
              takeMyProp="This is the example page"
            />
          )}
        />
        <Route
          exact
          path="/example/level2"
          render={(props) => (
            <Example
              {...props}
              {...contentProps}
              takeMyProp="The example page can lead to related child pages"
            />
          )}
        />
        <Route
          exact
          path="/example/level2/level3"
          render={(props) => (
            <Example
              {...props}
              {...contentProps}
              takeMyProp="And those child pages can lead to their own child pages"
            />
          )}
        />
        <Route
          exact
          path="/example/level2/*"
          render={(props) => (
            <Example
              {...props}
              {...contentProps}
              takeMyProp="Heck these child pages could be something else entirely"
            />
          )}
        />

        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  );
};

const About = () => <h1>My About Page</h1>;

export default App;

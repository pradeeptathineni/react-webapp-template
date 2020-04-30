import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiPeanut } from "react-icons/gi";

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { stateful } = this.state;
    console.log("Example component's props:", this.props);
    return (
      <>
        <h1>Example Page</h1>
        <p>{this.props.takeMyProp}</p>
      </>
    );
  }
}

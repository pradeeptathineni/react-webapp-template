import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GiPeanut } from "react-icons/gi";

const exactPaths = {
  "/": ["Home"],
  "/example": ["Example"],
  "/example/level2": ["Example", "This Is The Level 2 Heading"],
  "/example/level2/level3": [
    "Example",
    "Or Is This The Level 2 Heading",
    "And a Level 3",
  ],
  "/example/level2/.*": ["Example", "Level 2", "SLUG"],
  "/user": ["User"],
  "/about": ["About"],
  "/not-found": ["Not Found"],
};

function checkPaths(selected) {
  let selectedPathing = ["Not Found"];
  Object.keys(exactPaths).forEach((path) => {
    if (RegExp(`^${path}$`).test(selected)) selectedPathing = exactPaths[path];
  });
  return selectedPathing;
}
export default class NavTopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: window.location.pathname,
    };
  }

  setSelected = (selected) => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;
    const selectedPathing = exactPaths[selected] || checkPaths(selected);
    let pathing = [];
    if (selected) {
      const pathSplit = selected.split("/").splice(1);
      selectedPathing.map((el, index) => {
        const runningPath = "/" + pathSplit.slice(0, index + 1).join("/");
        if (index === 0) {
          pathing.push(
            <a href={el === "Not Found" ? "/not-found" : runningPath}>{el}</a>
          );
        } else {
          pathing.push(<span> > </span>);
          pathing.push(
            <a href={runningPath}>{el === "SLUG" ? pathSplit[index] : el}</a>
          );
        }
      });
    }
    return (
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <a href="/">
          <GiPeanut id="Logo" />
          {/* Note the href will refresh the page */}
          <Navbar.Brand>Webapp</Navbar.Brand>
        </a>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              className={selected === "/" ? "selected" : ""}
              as={Link}
              to="/"
              onClick={() => this.setSelected("/")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              className={selected === "/example" ? "selected" : ""}
              as={Link}
              to="/example"
              onClick={() => this.setSelected("/example")}
            >
              Example
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="See More" className="collapsible-nav-dropdown">
              <NavDropdown.Item
                className={selected === "/example/level2" ? "selected" : ""}
                as={Link}
                to="/example/level2"
                onClick={() => this.setSelected("/example/level2")}
              >
                Level 2
              </NavDropdown.Item>
              <NavDropdown.Item
                className={
                  selected === "/example/level2/level3" ? "selected" : ""
                }
                as={Link}
                to="/example/level2/level3"
                onClick={() => this.setSelected("/example/level2/level3")}
              >
                Level 3
              </NavDropdown.Item>
              <NavDropdown.Item>Something Else</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                className={selected === "/about" ? "selected" : ""}
                as={Link}
                to="/about"
                onClick={() => this.setSelected("/about")}
              >
                About Us
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              className={selected === "/user" ? "selected" : ""}
              as={Link}
              to="/user"
              onClick={() => this.setSelected("/user")}
            >
              User Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <span id="nav-pathing">{pathing}</span>
      </Navbar>
    );
  }
}

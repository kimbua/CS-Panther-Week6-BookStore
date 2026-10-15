import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import githubIco from "../images/github_icon.png";
import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <Navbar variant="dark" expand="sm" className="glass-navbar">
      <Navbar.Brand as={NavLink} to="/" className="brand">
        <span className="brand-dot" />
        <span className="brand-text">BookStore</span>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} exact to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/reading">
          Reading List
        </Nav.Link>
      </Nav>
      <Nav>
        <a
          href="#your_github_repo_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIco} alt="Github" width="28px" className="gh-icon" />
        </a>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;

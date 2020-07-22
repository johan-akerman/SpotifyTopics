import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Spotify_Logo.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar className="myNavbar">
          <Navbar.Brand>
            <img
              src={Logo}
              width="125"
              className="navbarBrand d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Link to="/">Logout</Link>
        </Navbar>
      </div>
    );
  }
}

export default Header;

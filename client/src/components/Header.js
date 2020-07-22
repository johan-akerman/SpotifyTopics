import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../Spotify_Logo.png";
import { Link } from "react-router-dom";

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
        </Navbar>
      </div>
    );
  }
}

export default Header;

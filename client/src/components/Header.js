import React, { Component } from "react";
import "../App.css";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Logo from "../Spotify_Logo.png";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    if (!this.props.user.images) {
      return <span></span>;
    }

    return (
      <div>
        <Navbar className="myNavbar">
          <Link to="/discover">
            <Navbar.Brand>
              <img
                src={Logo}
                width="125"
                className="navbarBrand d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <Dropdown id="dropDownBtn">
                <Dropdown.Toggle id="headerDropdown">
                  <img
                    className="profilePicture"
                    alt="userProfilePicture"
                    src={this.props.user.images[0].url}
                  />
                  <span className="profileName">
                    {this.props.user.display_name}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <a href="/">Log out</a>
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

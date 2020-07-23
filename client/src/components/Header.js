import React, { Component } from "react";
import "../App.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Logo from "../Spotify_Logo.png";
import { Link } from "react-router-dom";

class Header extends Component {
  checkAuthentication() {
    if (this.props.auth) {
      return <div>Log out</div>;
    } else {
      return <div>Log in</div>;
    }
  }

  render() {
    if (!this.props.user.images) {
      return <span></span>;
    }

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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Link to="/discover">Discover</Link>
            </Nav>
            <Form inline>
              <div>{this.props.user.display_name}</div>
              <img
                className="profilePicture"
                src={this.props.user.images[0].url}
              />

              {this.checkAuthentication()}
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class LandingPage extends Component {
  checkAuthentication() {
    if (this.props.auth) {
      window.history.pushState({}, "", "/discover");
    } else {
      return (
        <div>
          <div className="LandingPageContainer">
            <a
              className="episodeType"
              href="https://rampup.splashthat.com/?fbclid=IwAR2MVNdwdOymPRCJlQ8a_4h3A5vuFiyt1-43MsUdVOTSPhe5ZircqeTlBjA"
              target="_blank"
            >
              Spotify Ramp up challenge 2020
            </a>
            <h1 className="episodeTitle">Spotify Topics </h1>
            <p>
              Spotify topics is a timestamp navigation system for podcasts. The
              goal of this tool is to help you navigate through the content of
              an episode while making it easier to find interesting podcast
              based on what topics are being discussed. Sadly, the Spotify API
              does only provide a 30 seconds preview of each podcast episode. So
              this is just a demo.
            </p>
            <br />
            <a href="http://localhost:8888/login" className="openInSpotifyBtn">
              Log in with Spotify
            </a>
          </div>
          <div className="footer">
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/johan-akerman/"
              target="_blank"
            >
              Johan Åkerman
            </a>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.checkAuthentication()}</div>;
  }
}

export default LandingPage;

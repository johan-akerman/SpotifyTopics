import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class EpisodeSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { episode: "" };
  }

  componentDidMount() {
    spotifyWebApi.getEpisode("512ojhOuo1ktJprKbVcKyQ").then((response) => {
      console.log(response);
      this.setState({
        episode: response,
      });
    });
  }

  render() {
    return <React.Fragment>asdfas</React.Fragment>;
  }
}

export default EpisodeSidebar;

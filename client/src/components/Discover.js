import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = { episodes: [], user: "" };
  }

  componentDidMount() {
    spotifyWebApi
      .getEpisodes([
        "0QVuQXFPUitPeXH727JLgH",
        "2QG2XPrjKY6HYSjmxflMzP",
        "2R4VEgJfLXD2wKmL9c11l6",
      ])
      .then((response) => {
        this.setState({
          episodes: response.episodes,
        });
      });

    spotifyWebApi.getMe().then((response) => {
      this.setState({
        user: response,
      });
    });
  }

  render() {
    return (
      <div className="episodesContainer">
        <h1>Welcome {this.state.user.display_name},</h1>
        <br />

        <h2>Recommended episodes</h2>

        <div className="row">
          {this.state.episodes &&
            this.state.episodes.map((episode) => {
              return (
                <div className="col-lg-2" key={`episode - ${episode.id}`}>
                  <Link to={`/discover/${episode.id}`}>
                    <div className="podcastEpisodeCard">
                      <img
                        alt="thumbnail"
                        className="img img-fluid"
                        src={episode.images[0].url}
                      />
                      <h1>{episode.name}</h1>
                      <p>{episode.show.name}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>

        <br />

        {/* <h2>Trending topics</h2>
        <a>
          <span className="badge  badge-secondary badgeTopic">
            <h1>Spotify's framtid</h1>
            <p>Daniel Ek</p>
          </span>
        </a> */}
      </div>
    );
  }
}

export default Discover;

import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

const topics = require("../topics.json");

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
        "7LWWaN9qyuSMEg2I0DLG6z",
        "3C3imZeq18TABmcswlHgzY",
        "6oyFNKq3atN7U9splhDnuI",
        "2K25jghHW8RNdDbUf2dLde",
        "1D3H532YgQPn0HW9FJK0yq",
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

  getTrendingTopics() {
    var temp = [];
    topics.map((topic) => {
      if (topic.isTrending) {
        temp.push(topic);
      }
    });

    return temp;
  }

  render() {
    return (
      <div className="episodesContainer">
        <h1>Welcome {this.state.user.display_name},</h1>
        <br />

        <div className="row">
          <div className="col-lg-8">
            <h2>Recommended episodes</h2>

            <div className="row">
              {this.state.episodes &&
                this.state.episodes.map((episode) => {
                  return (
                    <div className="col-lg-3" key={`episode - ${episode.id}`}>
                      <Link
                        className="podcastEpisodeCardLink"
                        to={{
                          pathname: `/discover/${episode.id}`,
                        }}
                      >
                        <div className="podcastEpisodeCard">
                          <img
                            alt="thumbnail"
                            className="img img-fluid"
                            src={episode.images[0].url}
                          />
                          <h1 className="hideToLongText">{episode.name}</h1>
                          <p className="hideToLongText">{episode.show.name}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="col-lg-4">
            <h2>Trending topics</h2>

            {this.getTrendingTopics().map((topic) => {
              return (
                <Link
                  className="podcastEpisodeCardLink"
                  to={{
                    pathname: `/discover/${topic.episodeId}`,
                    state: {
                      time: topic.start,
                    },
                  }}
                >
                  <span className="badge badge-secondary badgeTopic">
                    <h1>{topic.title}</h1>
                    <p>{topic.publisher}</p>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Discover;

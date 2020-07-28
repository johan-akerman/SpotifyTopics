import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Spotify from "spotify-web-api-js";

const topics = [
  { title: "Topic #1", start: 0, stop: 7, key: 1 },
  { title: "Topic #2", start: 7, stop: 16, key: 2 },
  { title: "Topic #3", start: 16, stop: 30, key: 3 },
];

const trendingTopics = [
  {
    title: "Topic #1",
    publisher: "asdf",
    url: "asdf",
    start: 0,
    stop: 7,
    key: 1,
  },
  { title: "Topic #2", start: 7, stop: 16, key: 2 },
  { title: "Topic #3", start: 16, stop: 30, key: 3 },
];

const EpisodeTopics = {
  episodes: [
    {
      id: "0QVuQXFPUitPeXH727JLgH",
      publicer: "Under Femton",
      topics: [
        { title: "Topic #1", start: 0, stop: 7, key: 1 },
        { title: "Topic #2", start: 7, stop: 16, key: 2 },
        { title: "Topic #3", start: 16, stop: 30, key: 3 },
      ],
    },
    {
      id: "0QVuQXFPUitPeXH727JLgH",
      publicer: "Under Femton",
      topics: [
        { title: "Topic #1", start: 0, stop: 7, key: 1 },
        { title: "Topic #2", start: 7, stop: 16, key: 2 },
        { title: "Topic #3", start: 16, stop: 30, key: 3 },
      ],
    },
    {
      id: "0QVuQXFPUitPeXH727JLgH",
      publicer: "Under Femton",
      topics: [
        { title: "Topic #1", start: 0, stop: 7, key: 1 },
        { title: "Topic #2", start: 7, stop: 16, key: 2 },
        { title: "Topic #3", start: 16, stop: 30, key: 3 },
      ],
    },
  ],
};
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
        "4OWSOjrnNGMp6hn4NYVqBl",
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
                        to={`/discover/${episode.id}`}
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
            <a>
              <span className="badge  badge-secondary badgeTopic">
                <h1>Spotify's framtid</h1>
                <p>#ensakidag - en riktigt viktig sak varje morgon</p>
              </span>
            </a>

            <a>
              <span className="badge  badge-secondary badgeTopic">
                <h1>Framtidens självkörande lastbilar</h1>
                <p>Under Femton</p>
              </span>
            </a>

            <a>
              <span className="badge  badge-secondary badgeTopic">
                <h1>Europas största batteri fabrik</h1>
                <p>Allt du behöver veta om ny teknik</p>
              </span>
            </a>

            <a>
              <span className="badge  badge-secondary badgeTopic">
                <h1>How to get an internship at Spotify</h1>
                <p>The Greenroom</p>
              </span>
            </a>

            <a>
              <span className="badge  badge-secondary badgeTopic">
                <h1>How to think big</h1>
                <p>The Tim Ferris Show</p>
              </span>
            </a>

            <a>
              <span className="badge  badge-secondary badgeTopic">
                <h1>Livet på KTH</h1>
                <p>Mitt liv som ingenjör</p>
              </span>
            </a>

            <a>
              <span className="badge  badge-secondary badgeTopic">
                <h1>Hur man bygger ett imperium</h1>
                <p>Framgångspodden</p>
              </span>
            </a>
          </div>
        </div>

        <br />
      </div>
    );
  }
}

export default Discover;

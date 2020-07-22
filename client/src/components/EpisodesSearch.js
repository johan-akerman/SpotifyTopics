import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import "../App.css";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class Episodes extends Component {
  constructor() {
    super();

    this.state = {
      nowPlaying: {
        name: "not checked",
      },
      songs: [],
      searchInput: "",
    };
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  searchSong = (event) => {
    event.preventDefault();
    spotifyWebApi
      .searchEpisodes(this.state.searchInput, "episode")
      .then((response) => {
        console.log(response);
        this.setState({
          songs: response.episodes.items,
          // songs: response.tracks.items,
          // songs: response.episodes.items.sort(
          //   (a, b) => parseFloat(b.popularity) - parseFloat(a.popularity) //sorts out of popularity
          // ),
        });

        console.log(this.state.songs);
      });
  };

  renderTable() {
    if (this.state.songs === "") {
      return <div>No songs...</div>;
    } else {
      return (
        <Table className="myTable">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.songs.map((result) => (
              <tr key={result.id}>
                <td>{result.name}</td>
                <td>{result.release_date}</td>
                <td>{result.duration_ms}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <form onSubmit={this.searchSong}>
            <label>
              <h1>Search for a song</h1>
              <br></br>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                autoComplete="off"
              />
            </label>
            <button type="submit">Search lyrics</button>
          </form>

          {this.renderTable()}
        </div>
      </React.Fragment>
    );
  }
}

export default Episodes;

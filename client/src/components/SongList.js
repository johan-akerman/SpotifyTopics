import React from "react";
import axios from "axios";

export default class SongList extends React.Component {
  state = {
    myTokenId: "f0ZBfcDiL9WPYeCR",
    myUserId: "7926",
    searchInput: "",
    searchOutput: [],
  };

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://www.abbreviations.com/services/v2/lyrics.php?uid=${this.state.myUserId}&tokenid=${this.state.myTokenId}&term=${this.state.searchInput}&format=json`
      )
      .then((res) => {
        this.setState({ searchOutput: res.data.result });
      });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h1>
              Find the song for the lyrics stuck on your{" "}
              <span role="img" aria-label="emoji">
                🧠
              </span>
            </h1>
            <br></br>
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Search lyrics</button>
        </form>
        <ul>
          {this.state.searchOutput.map((result) => (
            <li>
              {result.song}, {result.artist}, {result.album}
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

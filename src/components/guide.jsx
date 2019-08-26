import React, { Component } from "react";
class Guide extends Component {
  render() {
    const emotes = require("./emotes.json");

    return (
      <div className="jumbotron">
        <h2 className="display-4">
          Welcome to the Teamfight Tactics Item Quiz!{" "}
          <img src={emotes.emotes[0].images[9].img} />
        </h2>
        <p className="lead">Read below for instructions on how to play</p>
        <hr />
        <p>
          Test your knowledge of the combined item in the middle by choosing 2
          base items on the bottom left. Selections will appear to the right.
          <br />
          Press{" "}
          <button type="button" className="btn btn-success">
            Submit
          </button>{" "}
          when you're ready to submit your answer, or press{" "}
          <button type="button" className="btn btn-danger">
            Skip
          </button>{" "}
          to skip to a different item.
          <br />
          If you click an item and want to unselect it, press{" "}
          <button type="button" className="btn btn-info">
            Reset Selected
          </button>{" "}
          or alternatively just click on the selected item to deselect.
          <br />
          <button type="button" className="btn btn-primary">
            Cheat sheet
          </button>{" "}
          contains the combinations for all items in the tooltip when you hover
          over the item image; however it will reset your score to 0!
          <br />
          Try the{" "}
          <button type="button" className="btn btn-warning">
            Speed Timer Mode
          </button>{" "}
          for a 30 second speed challenge to see how many points you can
          accumulate!
        </p>
        <hr />
        <span className="font-weight-bold">
          +1 point for answering correctly <br /> 0 points for skipping <br />{" "}
          -1 point for answering incorrectly
        </span>
      </div>
    );
  }
}

export default Guide;

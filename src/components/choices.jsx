import React, { Component } from "react";
class Choices extends Component {
  render() {
    const items = require("./items.json");
    const { index, onSelect } = this.props;

    return (
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => this.props.onSelect(index)}
      >
        <img src={items.items[index].img} />
      </button>
    );
  }
}

export default Choices;

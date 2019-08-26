import React, { Component } from "react";
class Selected extends Component {
  render() {
    const items = require("./items.json");
    const { index, deselected } = this.props;
    return (
      <button
        className="btn btn-secondary"
        onClick={() => this.props.deselected(index)}
      >
        <img src={items.items[index].img} />
      </button>
    );
  }
}

export default Selected;

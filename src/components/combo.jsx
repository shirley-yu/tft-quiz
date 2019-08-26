import React, { Component } from "react";
import { Image } from "react-bootstrap";
class Combo extends Component {
  render() {
    const items = require("./items.json");
    const { mainIndex, comboIndex } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col" />
          <div className="col" />
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <Image
              src={items.items[mainIndex].combinations[comboIndex].comboImg}
              thumbnail
            />
          </div>
          <div className="col" />
          <div className="col" />
        </div>
        <hr />
      </div>
    );
  }
}

export default Combo;

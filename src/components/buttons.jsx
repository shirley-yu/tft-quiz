import React, { Component } from "react";
class Buttons extends Component {
  render() {
    const { onSubmit, onNext, onReset } = this.props;

    return (
      <div
        className="btn-toolbar"
        role="toolbar"
        aria-label="Toolbar with button groups"
      >
        <div className="btn-group mr-2" role="group" aria-label="First group">
          <button type="button" className="btn btn-success" onClick={onSubmit}>
            Submit
          </button>
        </div>
        <div className="btn-group mr-2" role="group" aria-label="Second group">
          <button type="button" className="btn btn-danger" onClick={onNext}>
            Skip
          </button>
        </div>
        <button type="button" className="btn btn-info" onClick={onReset}>
          Reset Selected
        </button>
      </div>
    );
  }
}

export default Buttons;

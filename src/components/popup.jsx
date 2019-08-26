import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class Popup extends Component {
  render() {
    const {
      show,
      onShow,
      onClose,
      combo,
      correct,
      selected,
      index
    } = this.props;

    const emotes = require("./emotes.json");
    const items = require("./items.json");
    const correctMsg = "Correct! +1";
    const incorrectMsg = "Incorrect.. -1";
    const incorrectMsg2 = "You made ";

    var selected1 = selected.filter(item => item.selected[0] === true);
    var selected2 = selected.filter(item => item.selected[1] === true);

    return (
      <>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          onHide={onClose}
        >
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title style={{ margin: "0 auto" }}>
              {this.props.correct ? correctMsg : incorrectMsg}
              <img
                src={
                  this.props.correct
                    ? emotes.emotes[0].images[index[0]].img
                    : emotes.emotes[1].images[index[1]].img
                }
              />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              {!correct && selected1.length > 0 && selected2.length > 0 ? (
                <>
                  {incorrectMsg2 +
                    items.items[selected1[0].index].combinations[
                      selected2[0].index
                    ].combo}
                  {"."}
                  <br />
                  <img
                    src={
                      items.items[selected1[0].index].combinations[
                        selected2[0].index
                      ].comboImg
                    }
                  />
                  <hr />
                </>
              ) : (
                ""
              )}
            </div>
            <div className=" text-center" />
            <div className="font-weight-bold text-center">
              <h5>{items.items[combo.main].combinations[combo.combo].combo}</h5>
            </div>{" "}
            <div className="text-center">
              combines from{" "}
              <span className="font-weight-bold">
                {items.items[combo.main].name}
              </span>{" "}
              and{" "}
              <span className="font-weight-bold">
                {items.items[combo.combo].name}
              </span>
              .
            </div>
            <div className="text-center">
              <img src={items.items[combo.main].img} />{" "}
              <img src={items.items[combo.combo].img} />
            </div>
            <div className="font-weight-light text-center">
              <span className="font-weight-bold">Stats: </span>
              {items.items[combo.main].combinations[combo.combo].stat}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary btn-lg"
              variant="secondary"
              onClick={onClose}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Popup;

import React, { Component } from "react";
import { Button, Modal, Table } from "react-bootstrap";

class Cheatsheet extends Component {
  render() {
    const { show, onShow, onClose } = this.props;
    const items = require("./items.json");

    return (
      <>
        <Button variant="primary" onClick={onShow}>
          Cheat sheet
        </Button>

        <Modal size="lg" show={show} onHide={onClose}>
          <Modal.Header closeButton onClick={onClose}>
            <Modal.Title>Item Combinations Cheatsheet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p> Hover item icon to see item combinations. </p>
            <Table striped bordered hover>
              <thead>
                {items.items.map(main => {
                  return (
                    <tr key={main.name}>
                      {main.combinations.map(combo => {
                        return (
                          <th key={combo.combo}>
                            <a
                              key={combo.combo}
                              data-toggle="tooltip"
                              data-placement="top"
                              title={main.name + ", " + combo.name}
                            >
                              <img src={combo.comboImg} />
                            </a>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Cheatsheet;

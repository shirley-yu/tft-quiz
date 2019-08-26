import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
class Timer extends Component {
  render() {
    const {
      timerFlag,
      onToggle,
      seconds,
      onCloseTimer,
      score,
      showScore,
      onFlagSubmit,
      submitFlag,
      onInputName,
      onSubmitToDB
    } = this.props;

    const emotes = require("./emotes.json");

    return (
      <div>
        <button className="btn btn-warning" onClick={onToggle}>
          Speed Timer Mode{" "}
          {timerFlag ? (
            <span className="badge badge-pill badge-dark">
              {seconds} {"seconds left"}
            </span>
          ) : (
            ""
          )}{" "}
        </button>
        <Modal
          show={showScore}
          onHide={function() {
            return;
          }}
        >
          {submitFlag ? (
            <>
              <Modal.Header closeButton onClick={onCloseTimer}>
                <Modal.Title>Submit Score</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">
                      Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={onInputName}
                        placeholder="Enter player name here"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm="2">
                      Score
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        plaintext
                        readOnly
                        name="currentScore"
                        defaultValue={score}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={onSubmitToDB}>
                  Submit
                </Button>
                <Button variant="secondary" onClick={onCloseTimer}>
                  Cancel
                </Button>
              </Modal.Footer>
            </>
          ) : (
            <>
              <Modal.Header closeButton onClick={onCloseTimer}>
                <Modal.Title>Speed mode is finished!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  You got {score} combinations in 30 seconds!
                  <img src={emotes.emotes[0].images[11].img} />
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={onFlagSubmit}>
                  Submit Score
                </Button>
                <Button variant="secondary" onClick={onCloseTimer}>
                  Return
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    );
  }
}

export default Timer;

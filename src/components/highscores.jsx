import React, { Component } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";

class HighScores extends Component {
  render() {
    const {
      highScores,
      showHighScoresFlag,
      onShowHighScoreList,
      onCloseHighScoreList,
      handleSearch,
      currentSearch,
      searchedHighScores
    } = this.props;

    return (
      <div>
        <Button variant="info" onClick={onShowHighScoreList}>
          High Scores
        </Button>

        <Modal show={showHighScoresFlag} onHide={onCloseHighScoreList}>
          <Modal.Header closeButton onClick={onCloseHighScoreList}>
            <Modal.Title>High Scores</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group as={Row}>
              <Col sm="10">
                <Form.Control
                  type="input"
                  placeholder="Player name here"
                  onChange={handleSearch}
                />
              </Col>
              <Button variant="primary">Search</Button>
            </Form.Group>
            {currentSearch === ""
              ? [
                  <Table striped bordered hover key={"top10"}>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>High Scores</th>
                      </tr>
                    </thead>
                    <tbody>
                      {highScores.map((score, index) => {
                        return (
                          <tr key={score.name + score.score}>
                            {index < 10 ? (
                              index === 0 ? (
                                <>
                                  <td className="font-weight-bold">
                                    {index + 1}
                                  </td>
                                  <td className="font-weight-bold">
                                    {score.name}
                                  </td>
                                  <td className="font-weight-bold">
                                    {score.score}
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td className="font-weight-light">
                                    {index + 1}
                                  </td>
                                  <td className="font-weight-light">
                                    {score.name}
                                  </td>
                                  <td className="font-weight-light">
                                    {score.score}
                                  </td>
                                </>
                              )
                            ) : (
                              []
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ]
              : [
                  <Table striped bordered hover key={"search"}>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>High Scores</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedHighScores.map(score => {
                        return (
                          <tr key={score.name + score.score}>
                            <td className="font-weight-light">{score.rank}</td>
                            <td className="font-weight-light">{score.name}</td>
                            <td className="font-weight-light">{score.score}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ]}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCloseHighScoreList}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default HighScores;

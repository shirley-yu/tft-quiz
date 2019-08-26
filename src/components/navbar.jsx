import React, { Component } from "react";
import Cheatsheet from "./cheatsheet";
import Timer from "./timer";
import HighScores from "./highscores";

class NavBar extends Component {
  render() {
    const {
      score,
      showCheatsheet,
      onShowCheatsheet,
      onCloseCheatsheet,
      timerFlag,
      onToggleTimer,
      seconds,
      onCloseTimer,
      showTimerScore,
      highScores,
      showHighScoresFlag,
      onShowHighScoreList,
      onCloseHighScoreList,
      onFlagSubmit,
      submitFlag,
      onInputName,
      onSubmitToDB,
      handleSearch,
      currentSearch,
      searchedHighScores
    } = this.props;

    const items = require("./items.json");

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Score{" "}
          <span className="badge badge-pill badge-secondary">{score}</span>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Cheatsheet
                show={showCheatsheet}
                onShow={onShowCheatsheet}
                onClose={onCloseCheatsheet}
              />
            </li>
            <li className="nav-item">
              <Timer
                timerFlag={timerFlag}
                onToggle={onToggleTimer}
                seconds={seconds}
                onCloseTimer={onCloseTimer}
                score={score}
                showScore={showTimerScore}
                onFlagSubmit={onFlagSubmit}
                submitFlag={submitFlag}
                onInputName={onInputName}
                onSubmitToDB={onSubmitToDB}
              />{" "}
            </li>
            <li className="nav-item">
              <HighScores
                highScores={highScores}
                showHighScoresFlag={showHighScoresFlag}
                onShowHighScoreList={onShowHighScoreList}
                onCloseHighScoreList={onCloseHighScoreList}
                handleSearch={handleSearch}
                currentSearch={currentSearch}
                searchedHighScores={searchedHighScores}
              />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;

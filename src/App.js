import React, { Component } from "react";
import "./App.css";
import Choices from "./components/choices";
import NavBar from "./components/navbar";
import Selected from "./components/selected";
import Combo from "./components/combo";
import Popup from "./components/popup";
import Guide from "./components/guide";
import Buttons from "./components/buttons";
import firebase from "./firebase.js";
// import console = require("console");

class App extends Component {
  state = {
    score: 0,
    combo: { main: 1, combo: 2 },
    showPopup: false,
    showCheatsheet: false,
    correct: false,
    timerMode: false,
    showTimerScore: false,
    popupIndex: [0, 0],
    startingTime: 30,
    seconds: 0,
    items: [
      { index: 0, selected: [false, false] },
      { index: 1, selected: [false, false] },
      { index: 2, selected: [false, false] },
      { index: 3, selected: [false, false] },
      { index: 4, selected: [false, false] },
      { index: 5, selected: [false, false] },
      { index: 6, selected: [false, false] },
      { index: 7, selected: [false, false] }
    ],
    showScores: false,
    highScores: [{ name: "shirley", score: 20 }],
    submit: false,
    currentHighScore: [{ name: "", score: 0 }],
    currentSearch: "",
    searchedHighScores: []
  };

  componentDidMount() {
    const scoresRef = firebase.database().ref("scores");
    scoresRef.on("value", snapshot => {
      let scores = snapshot.val();
      let newState = [];
      for (let s in scores) {
        newState.push({
          id: s,
          name: scores[s].name,
          score: scores[s].score
        });
      }
      newState.sort(function(a, b) {
        return b.score - a.score;
      });
      this.setState({
        highScores: newState
      });
    });
    // const score = {
    //   name: "shirley",
    //   score: "30"
    // };
    // scoresRef.push(score);
    // this.setState({ testing: scoresRef });
    setInterval(() => {
      this.handleCountdown();
    }, 1000);
  }

  handleSelect = itemIndex => {
    var items = [...this.state.items];
    var count = 0;
    for (let i = 0, j = items.length; i < j; i += 1) {
      if (items[i].selected[0] === true) {
        count += 1;
      }
      if (items[i].selected[1] === true) {
        count += 1;
      }
    }
    if (count < 2) {
      if (count === 0) {
        items[itemIndex].selected[0] = true;
      } else if (count === 1) {
        items[itemIndex].selected[1] = true;
      }
    }
    this.setState({ items });
  };

  handleNext = () => {
    var itemIndex = Math.floor(Math.random() * 8);
    var comboIndex = Math.floor(Math.random() * 8);
    var combo = this.state.combo;
    combo.main = itemIndex;
    combo.combo = comboIndex;
    this.setState({ combo }, () => {
      this.handleReset();
    });
  };

  handleShow = () => {
    if (!this.state.timerMode) {
      const emotes = require("./components/emotes.json");

      var index1 = Math.floor(Math.random() * emotes.emotes[0].images.length);
      var index2 = Math.floor(Math.random() * emotes.emotes[1].images.length);
      var popupIndex = [index1, index2];
      var showPopup = true;
      this.setState({ showPopup, popupIndex });
    }
  };

  handleClose = () => {
    var showPopup = false;
    // this.setState({ showPopup });
    this.setState({ showPopup }, () => {
      this.handleNext();
    });
  };

  handleReset = () => {
    var items = this.state.items.map(item => {
      item.selected[0] = false;
      item.selected[1] = false;
      return item;
    });
    this.setState({ items });
  };

  handleSubmit = () => {
    var selected1 = this.state.items.filter(item => item.selected[0] === true);
    var selected2 = this.state.items.filter(item => item.selected[1] === true);
    // console.log(selected1, selected2);
    var combo = this.state.combo;
    var score = this.state.score;
    var correct;
    if (selected1.length === 1 && selected2.length === 1) {
      var index = [selected1[0].index, selected2[0].index];
      // console.log(index);

      if (
        index[0] === this.state.combo.main &&
        index[1] === this.state.combo.combo
      ) {
        // console.log(score);
        correct = true;
        score += 1;
        // console.log(score);
      } else if (
        index[0] === this.state.combo.combo &&
        index[1] === this.state.combo.main
      ) {
        // console.log(score);
        correct = true;
        score += 1;
        // console.log(score);
      } else {
        if (score > 0) {
          correct = false;
          score -= 1;
        }
      }
      if (!this.state.timerMode) {
        this.setState({ score, correct }, () => {
          this.handleShow();
        });
      } else {
        this.setState({ score, correct });
        this.handleNext();
      }
    }
  };

  handleShowCheat = () => {
    var showCheatsheet = true;
    this.setState({ showCheatsheet });
  };

  handleCloseCheat = () => {
    var showCheatsheet = false;
    var score = 0;
    this.setState({ showCheatsheet, score }, () => {
      this.handleNext();
    });
  };

  handleUnclickSelected1 = itemIndex => {
    var items = [...this.state.items];
    items[itemIndex].selected[0] = false;
    for (let i = 0, j = items.length; i < j; i += 1) {
      if (items[i].selected[1] === true) {
        items[i].selected[1] = false;
        items[i].selected[0] = true;
      }
    }
    this.setState({ items });
  };

  handleUnclickSelected2 = itemIndex => {
    var items = [...this.state.items];
    items[itemIndex].selected[1] = false;
    this.setState({ items });
  };

  handleToggleTimer = () => {
    var timerMode = true;
    var score = 0;
    var seconds = this.state.seconds;
    if (timerMode === true) {
      seconds = this.state.startingTime;
    }
    this.setState({ timerMode, seconds, score }, () => {
      this.handleCountdown();
      this.handleNext();
    });
  };

  handleCountdown() {
    if (this.state.timerMode) {
      if (this.state.seconds > 0) {
        var showTimerScore = this.state.showTimerScore;
        var timerMode = this.state.timerMode;
        var seconds = this.state.seconds - 1;
      } else if (this.state.seconds === 0) {
        showTimerScore = true;
        seconds = 0;
        timerMode = false;
      }
      this.setState({ seconds, timerMode, showTimerScore });
    }
  }

  handleTimerClose = () => {
    var timerMode = false;
    var submit = false;
    var score = 0;
    var showTimerScore = false;
    this.setState({ timerMode, score, showTimerScore, submit }, () => {
      this.handleNext();
    });
  };

  handleShowScores = () => {
    var showScores = true;
    this.setState({ showScores });
  };

  handleCloseScores = () => {
    var showScores = false;
    var currentSearch = "";
    this.setState({ showScores, currentSearch });
  };

  handleSubmitFlag = () => {
    var submit = true;
    this.setState({ submit });
  };

  handleNameInput = event => {
    var currName = event.target.value;
    // console.log(currName);
    var currScore = this.state.score;
    var currentHighScore = [{ name: currName, score: currScore }];
    this.setState({
      currentHighScore
    });
  };

  handleSubmitToDB = () => {
    const hiScoresRef = firebase.database().ref("scores");
    console.log("hi");
    const score = {
      name: this.state.currentHighScore[0].name,
      score: this.state.currentHighScore[0].score
    };
    hiScoresRef.push(score);
    this.setState(
      {
        currentHighScore: [{ name: "", score: 0 }]
      },
      () => {
        this.handleTimerClose();
      }
    );
  };

  handleSearch = event => {
    var currentSearch = event.target.value;
    var hiScores = this.state.highScores;
    if (currentSearch !== "") {
      var searchedHighScores = [];
      var currSearchLower = currentSearch.toLowerCase();
      for (let i = 0; i < hiScores.length; i++) {
        var lowercase = hiScores[i].name;
        lowercase = lowercase.toLowerCase();
        if (lowercase.includes(currSearchLower)) {
          searchedHighScores.push({
            rank: i + 1,
            name: hiScores[i].name,
            score: hiScores[i].score
          });
        }
      }
    }
    this.setState({
      currentSearch,
      searchedHighScores
    });
  };

  render() {
    const items = require("./components/items.json");
    return (
      <React.Fragment>
        <NavBar
          showCheatsheet={this.state.showCheatsheet}
          onShowCheatsheet={this.handleShowCheat}
          onCloseCheatsheet={this.handleCloseCheat}
          score={this.state.score}
          onToggleTimer={this.handleToggleTimer}
          seconds={this.state.seconds}
          timerFlag={this.state.timerMode}
          onCloseTimer={this.handleTimerClose}
          showTimerScore={this.state.showTimerScore}
          highScores={this.state.highScores}
          showHighScoresFlag={this.state.showScores}
          onShowHighScoreList={this.handleShowScores}
          onCloseHighScoreList={this.handleCloseScores}
          submitFlag={this.state.submit}
          onFlagSubmit={this.handleSubmitFlag}
          onInputName={this.handleNameInput}
          onSubmitToDB={this.handleSubmitToDB}
          handleSearch={this.handleSearch}
          currentSearch={this.state.currentSearch}
          searchedHighScores={this.state.searchedHighScores}
        />
        <hr />
        <Guide />

        <div>
          <Combo
            mainIndex={this.state.combo.main}
            comboIndex={this.state.combo.combo}
          />
        </div>
        <div>
          {this.state.items.map(item => {
            return (
              <Choices
                key={item.index}
                index={item.index}
                onSelect={this.handleSelect}
              />
            );
          })}{" "}
          <span>
            {this.state.items
              .filter(item => item.selected[0] === true)
              .map(item => {
                return (
                  <Selected
                    deselected={this.handleUnclickSelected1}
                    key={item.index}
                    index={item.index}
                  />
                );
              })}
            {this.state.items
              .filter(item => item.selected[1] === true)
              .map(item => {
                return (
                  <Selected
                    deselected={this.handleUnclickSelected2}
                    key={item.index}
                    index={item.index}
                  />
                );
              })}
          </span>
        </div>
        <hr />
        <div>
          <Buttons
            onSubmit={this.handleSubmit}
            onNext={this.handleNext}
            onReset={this.handleReset}
          />
        </div>
        <Popup
          selected={this.state.items}
          correct={this.state.correct}
          show={this.state.showPopup}
          combo={this.state.combo}
          onShow={this.handleShow}
          onClose={this.handleClose}
          index={this.state.popupIndex}
        />
      </React.Fragment>
    );
  }
}

export default App;

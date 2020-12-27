/*
  All code here is blatantly stolen from Treehouse's React Basics workshop found at https://teamtreehouse.com/library/react-basics

  The difference is, after completing the worksjop I ES2015-ified the react components and javascript as an exercise to practice more ES2015.
*/

import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./ScoreBoard.css";

// Es6 Stateless component
const Stats = (props) => {
  const totalPlayers = props.players.length;

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Echipe:</td>
          <td>{totalPlayers}</td>
        </tr>
      </tbody>
    </table>
  );
};
// Define proptypes fpr a stateless component
// Stats.propTypes = {
//   players: React.PropTypes.array.isRequired,
// };

// Es6 Stateless component
const Header = (props) => (
  <div className="header">
    <Stats players={props.players} />
    <h1>{props.title}</h1>
  </div>
);
// Define proptypes fpr a stateless component
// Header.propTypes = {
//   title: React.PropTypes.string.isRequired,
//   players: React.PropTypes.array.isRequired,
// };

// Es6 Stateless component
const Counter = (props) => (
  <div className="counter">
    <div className="counter-score"> {props.score} </div>
  </div>
);

// Es6 Stateless component
const Player = (props) => (
  <div className="player">
    <div className="player-name">{props.name}</div>
    {(props.turn == "host" && props.name == "Red Team") ||
    (props.turn == "hosted" && props.name == "Blue Team") ? (
      <div className="spinner">
        <Spinner
          animation="grow"
          variant={props.name == "Red Team" ? "danger" : "primary"}
        />
      </div>
    ) : null}
    <div className="player-score">
      <Counter score={props.score} onChange={props.onScoreChange} />
    </div>
  </div>
);

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    // Set the initial state
    this.state = {};
    // Bind custom methods
    // this._onScoreChange = this._onScoreChange.bind(this);
  }

  //   _onScoreChange(index, delta) {
  //     this.state.players[index].score += delta;
  //     this.setState(this.state);
  //   }

  render() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.props.initialPlayers} />

        <div className="players">
          {this.props.initialPlayers.map((player, index) => (
            <Player
              onScoreChange={(delta) => this._onScoreChange(index, delta)}
              turn={this.props.turn}
              name={player.name}
              score={player.score}
              key={player.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ScoreBoard;

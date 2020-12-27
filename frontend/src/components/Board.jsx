import React, { Component } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import RowOfCards from "./RowOfCards";
export default class Board extends Component {
  state = {};
  constructor(props) {
    super();
  }
  getRowsOfCards = () => {
    return this.props.board.RowsOfCards.map((rowOfCards) => (
      <RowOfCards
        board={this.props.board}
        cards={rowOfCards.Cards}
        captainMode={this.props.captainMode}
        isHost={this.props.isHost}
        currentTurn={this.props.currentTurn}
        socket={this.props.socket}
        gameId={this.props.gameId}
      ></RowOfCards>
    ));
  };

  componentDidMount = () => {};

  render() {
    return (
      <React.Fragment>
        <div className="board">{this.getRowsOfCards()}</div>
      </React.Fragment>
    );
  }
}

import React, { Component } from "react";
import "../App.css";
import "./Card.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Card from "./Card";
import ReactCardFlip from "react-card-flip";
export default class RowOfCards extends Component {
  state = {};
  componentDidMount = () => {};
  constructor(props) {
    super();
  }
  getCards = () => {
    return this.props.cards.map((card) => (
      <Card
        // rowOfCards={this.props.rowOfCards}
        board={this.props.board}
        card={card}
        captainMode={this.props.captainMode}
        currentTurn={this.props.currentTurn}
        isHost={this.props.isHost}
        socket={this.props.socket}
        gameId={this.props.gameId}
      ></Card>
    ));
  };
  render() {
    return <div className="rows ">{this.getCards()}</div>;
  }
}

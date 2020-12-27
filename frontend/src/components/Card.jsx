import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../App.css";
import "./Card.css";
import RED1 from "../images/red1.jpg";
import RED2 from "../images/red2.jpg";
import BLUE1 from "../images/blue1.jpg";
import BLUE2 from "../images/blue2.jpg";
import YELLOW1 from "../images/yellow1.jpg";
import YELLOW2 from "../images/yellow2.jpg";
import BLACK from "../images/black.jpg";

const belongs = {
  INITIAL: "initial",
  HOST: "host",
  HOSTED: "hosted",
  NEUTRAL: "neutral",
  BLACK: "black",
};

const currentTurn = {
  NONE: "none",
  HOST: "host",
  HOSTED: "hosted",
};
export default class Card extends Component {
  state = {};
  componentDidMount = () => {};
  constructor(props) {
    super();
    //this.setState({ isFliped: props.card.isFliped });

    // console.log(props.card.isFliped);
  }

  //  if (belongsTo == belongs.HOST)

  getBackgroundColor = (_belongsTo) => {
    switch (_belongsTo) {
      case belongs.HOST:
        // if (this.props.captainMode)
        return "rgb(196, 19, 19)";
        // else if (this.state.isFliped)
        //   return "https://upload.wikimedia.org/wikipedia/he/4/48/Codenames-hebrew-cover.jpg";
        break;
      case belongs.HOSTED:
        return "rgb(38, 80, 170)";
        break;
      case belongs.NEUTRAL:
        return "rgb(214, 214, 95)";
        break;
      case belongs.BLACK:
        return "black";
        break;
      default:
    }
  };
  isEnabled = () => {
    if (this.props.card.IsFliped) return false;
    if (this.props.currentTurn == currentTurn.NONE && this.isHost) return true;
    else {
      if (this.props.isHost && this.props.currentTurn == currentTurn.HOST)
        return true;
      else if (
        !this.props.isHost &&
        this.props.currentTurn == currentTurn.HOSTED
      )
        return true;
      else return false;
    }
  };
  getBackgroundImage = () => {
    var res = "";
    if (this.props.captainMode || !this.props.card.IsFliped) return res;
    else {
      const redColor = this.props.card.ImageOne ? RED1 : RED2;
      const blueColor = this.props.card.ImageOne ? BLUE1 : BLUE2;
      const yellowColor = this.props.card.ImageOne ? YELLOW1 : YELLOW2;
      switch (this.props.card.BelongsTo) {
        case belongs.HOST:
          res = "url(" + redColor + ")";
          break;
        case belongs.HOSTED:
          res = "url(" + blueColor + ")";
          break;
        case belongs.NEUTRAL:
          res = "url(" + yellowColor + ")";
          break;
        case belongs.BLACK:
          res = "url(" + BLACK + ")";
          break;
      }

      return res;
    }
  };
  onButtonClick = () => {
    

    try {
      this.props.socket.emit("UPDATE_STATE", {
        card: this.props.card,
        game_id: this.props.gameId,
        // currentTurn: this.props.currentTurn,
      });
    } catch (ex) {
      console.log(ex);
    }
  };
  render() {
    const mystyle = {
      margin: "1%",
      paddingTop: "10%",
      width: "18%",
      backgroundColor: this.props.captainMode
        ? this.getBackgroundColor(this.props.card.BelongsTo)
        : "rgb(231, 223, 149)",
      backgroundImage: this.getBackgroundImage(),
      backgroundSize: "cover",
      borderRadius: "0.3cm",
      borderColor: "rgb(247, 214, 176)",
      position: "relative",
      opacity: 1,
    };
    return (
      <Button
        className={this.props.card.IsFliped ? "background" : ""}
        style={mystyle}
        disabled={!this.isEnabled()}
        onClick={this.onButtonClick}
      >
        {!this.props.card.IsFliped ? (
          <h4
            style={{
              fontWeight: "bold",
              fontFamily: "Guttman Vilna",
              backgroundColor: "white",
              color: "black",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              marginLeft: "10%",
              marginRight: "10%",
              borderRadius: "0.3cm",
              borderColor: "black",
              borderWidth: "5cm",
            }}
          >
            {this.props.card.Value}
          </h4>
        ) : null}
      </Button>
    );
  }
}

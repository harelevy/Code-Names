import React, { Component } from "react";
import "./App.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import io from "socket.io-client";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";

const status = {
  INITIAL: "initial",
  CREATED: "created",
  RUNNING: "running",
  FINISHED: "finished",
};
const currentTurn = {
  NONE: "none",
  HOST: "host",
  HOSTED: "hosted",
};
const winner = {
  INITIAL: "initial",
  HOST: "host",
  HOSTED: "hosted",
};
//http://localhost:3000
//https://code-names-hebrew.herokuapp.com/
const socket = io("http://localhost:3000");

class App extends Component {
  state = {
    game_id: -1,
    game_name: "",
    user_id: "",
    user_name: "",
    status: status.INITIAL,
    board: [],
    captain_mode: false,
    is_host: false,
    start_button_clicked: false,
    current_turn: currentTurn.NONE,
    players: [],
    previous_game: {},
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //host+hosted
    socket.on("INITIAL_USER_DATA", (data) => {
      this.setState({ user_id: data.user_id });
      console.log("success!!!!!! user id is:" + this.state.user_id);
    console.log(data.games);
    });
    //host
    socket.on("GAME_CREATED", (data) => {
      console.log("game created");
      this.setState({ status: status.CREATED, game_id: data.Id });
    });
    //host+hosted
    socket.on("RUN_GAME", (data) => {

      this.setState({ status: status.RUNNING, board: data.Board });
    });
   //host+hosted
    socket.on("START_GAME", (data) => {
      this.setState({
        current_turn: currentTurn.HOST,
        players: [
          {
            name: "Red Team",
            score: data.HostPlayer.Score,
            id: 1,
          },
          {
            name: "Blue Team",
            score: data.HostedPlayer.Score,
            id: 2,
          },
        ],
      });
    });
    socket.on("UPDATE_BOARD", (data) => {
      //console.log(data.Board);
      this.setState({
        board: data.Board,
        current_turn: data.HostTurn ? currentTurn.HOST : currentTurn.HOSTED,
        winner: data.Winner,
        status:
          data.Winner != winner.INITIAL ? status.FINISHED : this.state.status,
        players: [
          {
            name: "Red Team",
            score: data.HostPlayer.Score,
            id: 1,
          },
          {
            name: "Blue Team",
            score: data.HostedPlayer.Score,
            id: 2,
          },
        ],
      });
      if (data.Winner != winner.INITIAL && this.state.is_host) {
        socket.emit("END_GAME", { game_id: this.state.game_id });
      }
    });
    socket.on("SAVE_PREVIOUS", (data) => {
      this.setState({ previous_game: data });
    });
    socket.on("INITIALIZE_STATE", (data) => {
      console.log("in initialize");
      console.log(data.game.Board);
      this.setState({
        game_id: data.game.Id,
        game_name: data.game.Name,
        user_id: data.is_host
          ? data.game.HostPlayer.Id
          : data.game.HostedPlayer.Id,
        user_name: data.is_host
          ? data.game.HostPlayer.Name
          : data.game.HostedPlayer.Name,
        status: status.RUNNING,
        board: data.game.Board,
        captain_mode: false,
        is_host: data.is_host ? true : false,
        start_button_clicked: false,
        current_turn: currentTurn.NONE,
        players: [],
      });
    });
    
  }
  createNewGame = () => {
    this.setState({ is_host: true });
    socket.emit("CREATE_GAME", {
      game_name: this.state.game_name,
      user_id: this.state.user_id,
      user_name: this.state.user_name,
    });
  };
  ConnectGame = () => {
    socket.emit("CONNECT_GAME", {
      game_id: this.state.game_id,
      user_id: this.state.user_id,
      user_name: this.state.user_name,
    });
  };
  changeToCaptainMode = (e) => {
    this.setState({ captain_mode: true });
  };

  changeBackToNormalMode = (e) => {
    this.setState({ captain_mode: false });
  };
  isMyTurn = () => {
    let res = false;
    if (
      this.state.is_host == true &&
      this.state.current_turn == currentTurn.HOST
    )
      res = true;
    else if (
      this.state.is_host == false &&
      this.state.current_turn == currentTurn.HOSTED
    )
      res = true;
    return res;
  };

  startButtonOnClick = (e) => {
    this.setState({ start_button_clicked: true });
    socket.emit("START_GAME", {
      game_id: this.state.game_id,
    });
  };
  ShuffleButtonOnClick = (e)=>{
    socket.emit("SHUFFLE_BOARD", {  game_id: this.state.game_id});
  }
  
  rematchButtonOnClick = (e) => {
    socket.emit("REMATCH", this.state.previous_game);
  };
  endTurnButtonOnClick = (e)=>{
    socket.emit("SWITCH_TURN", {
      game_id: this.state.game_id
  });}

  render() {
    let onChangeModeClick = this.state.captain_mode
      ? this.changeBackToNormalMode
      : this.changeToCaptainMode;

    const ChangeModeStyle = {
      fontFamily: "Guttman Vilna",
      marginTop: "0.5%",
      fontWeight: "bold",
      fontSize: "150%",
    };
    const teamColor =
      this.state.current_turn == currentTurn.HOST ? "RED" : "BLUE";
    const turnMessageVariant =
      this.state.current_turn == currentTurn.HOST ? "danger" : "primary";
    const winnerColor = this.state.winner == winner.HOST ? "RED" : "BLUE";
    return (
      <div className="App">
        <Image
          className={
            this.state.status === status.RUNNING ? "Img animator" : "Img"
          }
          src="https://upload.wikimedia.org/wikipedia/he/4/48/Codenames-hebrew-cover.jpg"
        />
        {this.state.status === status.INITIAL ? (
          <div>
            <Accordion className="Acc">
              <Card className="cards">
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="info" eventKey="0">
                    Create Game!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="CardBody">
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridUserName">
                          <Form.Label className="labels">User Name</Form.Label>
                          <Form.Control
                            placeholder="Enter user name"
                            onChange={(e) => {
                              this.setState({ user_name: e.target.value });
                            }}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridRoomID">
                          <Form.Label className="labels">Room Name</Form.Label>
                          <Form.Control
                            placeholder="Enter room Name"
                            onChange={(e) => {
                              this.setState({ game_name: e.target.value });
                            }}
                          />
                        </Form.Group>
                      </Form.Row>
                    </Form>
                    <Button
                      variant="success"
                      type="submit"
                      onClick={(e) => {
                        this.createNewGame();
                      }}
                    >
                      Submit
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="cards">
                <Card.Header>
                  <Accordion.Toggle
                    className="ab"
                    as={Button}
                    variant="info"
                    eventKey="1"
                  >
                    Join Game!
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="CardBody">
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridUserName">
                          <Form.Label className="labels">User Name</Form.Label>
                          <Form.Control
                            placeholder="Enter user name"
                            onChange={(e) => {
                              this.setState({ user_name: e.target.value });
                            }}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridRoomID">
                          <Form.Label className="labels">Room Id</Form.Label>
                          <Form.Control
                            placeholder="Enter room ID"
                            onChange={(e) => {
                              this.setState({ game_id: e.target.value });
                            }}
                          />
                        </Form.Group>
                      </Form.Row>
                    </Form>
                    <Button
                      variant="success"
                      type="submit"
                      onClick={(e) => {
                        this.ConnectGame();
                      }}
                    >
                      Submit
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        ) : null}
        {this.state.status === status.CREATED ? (
          <div>
            <h1>
              <Badge variant="success">
                Room #{this.state.game_id} had been created!
              </Badge>
            </h1>
            <h1>
              <Badge variant="success">Waiting for a player to join...</Badge>
            </h1>
            <Spinner className="sp" animation="grow" variant="danger" />
          </div>
        ) : null}
        {this.state.status === status.RUNNING ? (
          <div>
            <div>
              {this.state.is_host ? (
                !this.state.start_button_clicked ? (
                  <div>
                  <div>
                  <Button
                    style={ChangeModeStyle}
                    variant="dark"
                    onClick={this.ShuffleButtonOnClick}
                  >
                    Shuffle Board
                  </Button>
                  </div>
                 
                  <div>
                  <Button
                    style={ChangeModeStyle}
                    variant="success"
                    onClick={this.startButtonOnClick}
                  >
                    Start
                  </Button>
                  </div>
                  </div>
                ) : null
              ) : this.state.current_turn == currentTurn.NONE ? (
                <div>
                  <Badge style={ChangeModeStyle} variant="dark">
                    Waiting for Host to start the game..
                  </Badge>
                  <Spinner animation="border" />
                </div>
              ) : null}
            </div>
            <div>
              {this.state.current_turn != currentTurn.NONE ? (
                <div>
                <div className="sb">
                  <ScoreBoard
                    turn={this.state.current_turn}
                    initialPlayers={this.state.players}
                  ></ScoreBoard>
                  <Button
                    variant="dark"
                    style={ChangeModeStyle}
                    onClick={onChangeModeClick}
                  >
                    Captain View
                  </Button>
                </div>
                {this.isMyTurn()?
                <div>
                <Button
                    variant={turnMessageVariant}
                    style={ChangeModeStyle}
                    onClick={this.endTurnButtonOnClick}
                  >
                    End Turn
                  </Button>
                  </div>:null}
                </div>
              ) : null}
            </div>
            <div>
              <Board
                board={this.state.board}
                isHost={this.state.is_host}
                currentTurn={this.state.current_turn}
                captainMode={this.state.captain_mode}
                socket={socket}
                gameId={this.state.game_id}
               
              ></Board>
            </div>
          </div>
        ) : null}
        {this.state.status === status.FINISHED ? (
          <div>
            <div>
              <Badge
                style={ChangeModeStyle}
                variant={winnerColor == "RED" ? "danger" : "primary"}
              >
                {winnerColor} Team won!
              </Badge>
            </div>
            <div>
              <Button
                style={ChangeModeStyle}
                variant="dark"
                onClick={this.rematchButtonOnClick}
              >
                REMATCH!
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
export default App;

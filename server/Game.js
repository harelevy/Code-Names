var Board = require("./Board");
var Player = require("./Player");

const belongs = {
  INITIAL: "initial",
  HOST: "host",
  HOSTED: "hosted",
  NEUTRAL: "neutral",
  BLACK: "black",
};

const winner = {
  INITIAL: "initial",
  HOST: "host",
  HOSTED: "hosted",
};

class Game {
  constructor(json, game_id) {
    this.Id = game_id;
    this.Name = json.game_name;
    this.HostPlayer = new Player(json.user_id, json.user_name);
    this.HostedPlayer = null;
    this.Board = new Board();
    this.HostTurn = true;
    this.Winner = winner.INITIAL;
  }

  copyFrom = (game)=>{
    var HostedPlayer = new Player(game.HostedPlayer.Id,game.HostedPlayer.Name);
    HostedPlayer.Score = game.HostedPlayer.Score;
    this.HostedPlayer = HostedPlayer;
    this.Board =  game.Board;
    this.HostTurn = game.HostTurn;
    this.Winner = game.Winner;
  }
  setWinner = (belongsTo) => {
    if (belongsTo == belongs.BLACK) {
      this.HostTurn
        ? (this.Winner = winner.HOSTED)
        : (this.Winner = winner.HOST);
    } else if (this.HostPlayer.Score == 9) this.Winner = winner.HOST;
    else if (this.HostedPlayer.Score == 8) this.Winner = winner.HOSTED;
  };
  setTurn = (belongsTo) => {
    if (belongsTo != belongs.HOST && this.HostTurn) {
      this.HostTurn = !this.HostTurn;
    } else if (belongsTo != belongs.HOSTED && !this.HostTurn) {
      this.HostTurn = !this.HostTurn;
    }
  };

  updateScore = (belongsTo) => {
    if (belongsTo == belongs.HOST) {
      this.HostPlayer.incrementScore();
    } else if (belongsTo == belongs.HOSTED) {
      this.HostedPlayer.incrementScore();
    }
  };
}

module.exports = Game;

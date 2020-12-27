var Card = require("./Card");
const belongs = {
  INITIAL: "initial",
  HOST: "host",
  HOSTED: "hosted",
  NEUTRAL: "neutral",
  BLACK: "black",
};
class RowOfCards {
  constructor() {
    this.Count = 5;
    this.Cards = [];
    this.intializeRaw();
  }
  intializeRaw = () => {
    // console.log("initializeRaw()");

    for (let index = 0; index < this.Count; index++) {
      this.Cards.push(new Card());
    }
  };
  fill = (words, belongsTo) => {
    // console.log("fill-rowofcards()");

    let i = 0;
    this.Cards.forEach((card) => {
      card.fill(words[i], belongsTo[i]);
      i++;
    });
  };

  flipCard = (_card,_board) =>
   {
    this.Cards.forEach((card) => 
    {
      if (card.Value == _card.Value) {
        card.IsFliped = true;
    if (card.BelongsTo == belongs.HOST)
    {
    card.ImageOne =_board.RedImageOne = !_board.RedImageOne;
    }
     else if (card.BelongsTo == belongs.HOSTED) 
     {
      card.ImageOne = _board.BlueImageOne = !_board.BlueImageOne;
    }
     else if (_card.BelongsTo == belongs.NEUTRAL)
      {
      card.ImageOne =_board.YellowImageOne = !_board.YellowImageOne;
    }

        return true;
      }
      return false;
    });
  };

 
}
module.exports = RowOfCards;

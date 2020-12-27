const belongs = {
  INITIAL: "initial",
  HOST: "host",
  HOSTED: "hosted",
  NEUTRAL: "neutral",
  BLACK: "black",
};
class Card {
  constructor() {
    this.Value = "";
    this.BelongsTo = belongs.INITIAL;
    this.IsFliped = false;
    this.ImageOne = undefined;
  }

  
  fill = (word, belongsTo) => {
    this.BelongsTo = belongsTo;
    this.Value = word;
  };
}
module.exports = Card;

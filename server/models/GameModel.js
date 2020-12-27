const mongoose = require("mongoose");

const GameSchema = mongoose.Schema({
  Id: Number,
  Name: String,
  HostPlayer: {
    Id: String,
    Name: String,
    Score: Number,
  },
  HostedPlayer: {
    Id: String,
    Name: String,
    Score: Number,
  },
  Board: {
    Count: Number,
    RedImageOne:Boolean,
    BlueImageOne:Boolean,
    YellowImageOne:Boolean,
    RowsOfCards:[
      {Count:Number,
        Cards:[
        {
          Value: String,
          BelongsTo: String,
          IsFliped : Boolean,
          ImageOne : Boolean},
        {
            Value: String,
            BelongsTo: String,
            IsFliped : Boolean,
            ImageOne : Boolean},
        {
              Value: String,
              BelongsTo: String,
              IsFliped : Boolean,
              ImageOne : Boolean},
        {
                Value: String,
                BelongsTo: String,
                IsFliped : Boolean,
                ImageOne : Boolean},
        {
                  Value: String,
                  BelongsTo: String,
                  IsFliped : Boolean,
                  ImageOne : Boolean}
      ]},
      {Count:Number,
        Cards:[
      {
        Value: String,
        BelongsTo: String,
        IsFliped : Boolean,
        ImageOne : Boolean},
      {
          Value: String,
          BelongsTo: String,
          IsFliped : Boolean,
          ImageOne : Boolean},
      {
            Value: String,
            BelongsTo: String,
            IsFliped : Boolean,
            ImageOne : Boolean},
      {
              Value: String,
              BelongsTo: String,
              IsFliped : Boolean,
              ImageOne : Boolean},
      {
                Value: String,
                BelongsTo: String,
                IsFliped : Boolean,
                ImageOne : Boolean}]},
      {Count:Number,
        Cards:[
           {
        Value: String,
        BelongsTo: String,
        IsFliped : Boolean,
        ImageOne : Boolean},
      {
          Value: String,
          BelongsTo: String,
          IsFliped : Boolean,
          ImageOne : Boolean},
      {
            Value: String,
            BelongsTo: String,
            IsFliped : Boolean,
            ImageOne : Boolean},
      {
              Value: String,
              BelongsTo: String,
              IsFliped : Boolean,
              ImageOne : Boolean},
      {
                Value: String,
                BelongsTo: String,
                IsFliped : Boolean,
                ImageOne : Boolean}]},
      {Count:Number,Cards:[ {
        Value: String,
        BelongsTo: String,
        IsFliped : Boolean,
        ImageOne : Boolean},
      {
          Value: String,
          BelongsTo: String,
          IsFliped : Boolean,
          ImageOne : Boolean},
      {
            Value: String,
            BelongsTo: String,
            IsFliped : Boolean,
            ImageOne : Boolean},
      {
              Value: String,
              BelongsTo: String,
              IsFliped : Boolean,
              ImageOne : Boolean},
      {
                Value: String,
                BelongsTo: String,
                IsFliped : Boolean,
                ImageOne : Boolean}]},
      {Count:Number,Cards:[ {
        Value: String,
        BelongsTo: String,
        IsFliped : Boolean,
        ImageOne : Boolean},
      {
          Value: String,
          BelongsTo: String,
          IsFliped : Boolean,
          ImageOne : Boolean},
      {
            Value: String,
            BelongsTo: String,
            IsFliped : Boolean,
            ImageOne : Boolean},
      {
              Value: String,
              BelongsTo: String,
              IsFliped : Boolean,
              ImageOne : Boolean},
      {
                Value: String,
                BelongsTo: String,
                IsFliped : Boolean,
                ImageOne : Boolean}]}
    ],

  },
  HostTurn:Boolean,
  Winner : String
});

module.exports = mongoose.model("Games", GameSchema);

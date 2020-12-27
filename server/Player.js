class Player {
  constructor(user_id, user_name) {
    this.Id = user_id;
    this.Name = user_name;
    this.Score = 0;
  }

  incrementScore = () => {
    this.Score++;
  };
}
module.exports = Player;

const db = require("./database");
module.exports = {
  addNewGame(game) {
    return db
      .get("games")
      .push({})
      .last()
      .assign({ id: Date.now().toString(), ...game })
      .write();
  },
  getAllGames() {
    return db.get("games").value();
  },
 
};

const BowlingGame = require("./lib/BowlingGame");
const API = require("./api");

const BowlingApp = (function() {
  let game = new BowlingGame();

  return {
    GenerateFrame() {
      game.generateFrame();
    },
    GetResults() {
      const result = game.results;
      if (result.status === BowlingGame.gameStatus.FINISHED) {
        API.addNewGame({
          status: result.status,
          framesCount: result.framesCount,
          frames: result.frames,
          score: result.score
        });
        game = new BowlingGame();
      }
      return result;
    }
  };
})();

module.exports = BowlingApp;

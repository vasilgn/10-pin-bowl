const express = require("express");
const router = express.Router();

const api = require("./src/api");
const BowlingApp = require("./src/bowling-app");

const apiRouter = function(app) {
  router.get("/roll", (req, res, next) => {
    BowlingApp.GenerateFrame();
    const {
      score,
      frames,
      status,
      frameScores,
      framesCount
    } = BowlingApp.GetResults();
    res.end(
      JSON.stringify(
        {
          status,
          frameScores,
          framesCount,
          score,
          frames
        },
        null,
        2
      )
    );
  });

  router.get("/games", (req, res, next) => {
    const games = api.getAllGames();
    if (!games) {
      res.end(JSON.stringify({ message: `No game found.` }, null, 2));
    } else if (Array.isArray(games)) {
      res.end(JSON.stringify(games, null, 2));
    } else {
      const { id, frames, score } = games;
      res.end(JSON.stringify({ id, score, frames }, null, 2));
    }
  });
  app.use("/api", router);
};

module.exports.apiRouter = apiRouter;

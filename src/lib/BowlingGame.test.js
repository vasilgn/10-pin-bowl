const BowlingGame = require("./BowlingGame");

describe("Bowling game scoring.", () => {
  describe("Test score calculations", () => {
    let game;
    beforeEach(() => {
      game = new BowlingGame();
    });
    test("Test 4th frame first ball gutter", () => {
      game.roll(10);
      game.roll(10);
      game.roll(10);
      game.roll(0);
      game.roll(9);
      for (let i = 0; i < 8; i++) {
        game.roll(10);
      }
      expect(game.results.score).toBe(258);
    });
    test("Test 4th frame second ball gutter", () => {
      game.roll(10);
      game.roll(10);
      game.roll(10);
      game.roll(9);
      game.roll(0);
      for (let i = 0; i < 8; i++) {
        game.roll(10);
      }
      expect(game.results.score).toBe(267);
    });
    test("Test gutter game", () => {
      for (let i = 0; i < 20; i++) {
        game.roll(0);
      }
      expect(game.results.score).toBe(0);
    });
    test("Test all ones", () => {
      for (let i = 0; i < 20; i++) {
        game.roll(1);
      }
      expect(game.results.score).toBe(20);
    });
    test("Test one spare", () => {
      game.roll(6);
      game.roll(4);
      game.roll(4);
      for (let i = 0; i < 17; i++) {
        game.roll(0);
      }
      expect(game.results.score).toBe(18);
    });
    test("Test one strike", () => {
      game.roll(10);
      game.roll(4);
      game.roll(5);
      for (let i = 0; i < 17; i++) {
        game.roll(0);
      }

      expect(game.results.score).toBe(28);
    });
    test("Test perfect game", () => {
      for (let i = 0; i < 12; i++) {
        game.roll(10);
      }

      expect(game.results.score).toBe(300);
      expect(game.results.frames[0].firstRoll).toBe("X");
    });
    test("Test random game with 3 strikes at end", () => {
      [1, 3, 7, 3, 10, 1, 7, 5, 2, 5, 3, 8, 2, 8, 2, 10, 10, 10, 10].forEach(
        pd => game.roll(pd)
      );

      expect(game.results.score).toBe(163);
    });
    test("Test 9 pins hit and miss for all 10 frames", () => {
      for (let i = 0; i < 20; i++) {
        if (i % 2 === 0) {
          game.roll(9);
        } else {
          game.roll(0);
        }
      }

      expect(game.results.score).toBe(90);
    });
    test("Test 1 frame", () => {
      game.roll(3);
      game.roll(2);
      expect(game.results.score).toBe(5);
    });
    test("Test 2  frames", () => {
      [1, 3, 4, 3].forEach(pd => game.roll(pd));
      expect(game.results.score).toBe(11);
    });

    test("Test 3  frames ends with strike", () => {
      [1, 3, 4, 3, 10].forEach(pd => game.roll(pd));
      expect(game.results.score).toBe(11);
    });

    test("Test random numbers", () => {
      [5, 2, 8, 2, 4, 1, 3, 5, 0, 5, 4, 1, 5, 5, 7, 0, 4, 1, 4, 4].forEach(pd =>
        game.roll(pd)
      );

      expect(game.results.score).toBe(81);
    });

    test("Test 1 frame generated", () => {
      game.generateFrame();
      expect(game.results.score).toBeGreaterThanOrEqual(0);
      expect(game.results.framesCount).toEqual(1);
    });

    test("Test 10 frames  generated", () => {
      for (let i = 0; i < 10; i++) {
        game.generateFrame();
      }
      expect(game.results.score).toBeGreaterThanOrEqual(0);
      expect(game.results.framesCount).toEqual(10);
    });

    test("Test mix and generate", () => {
      for (let i = 0; i < 10; i++) {
        if (i % 2 === 0 && i < 7) {
          game.roll(5);
          game.roll(5);
        } else {
          game.generateFrame();
        }
      }
      expect(game.results.score).toBeGreaterThanOrEqual(0);
      expect(game.results.framesCount).toEqual(10);
      expect(game.results.frames[0].firstRoll).toBe(5);
      expect(game.results.frames[0].secondRoll).toBe("/");
      expect(game.results.frames[6].firstRoll).toBe(5);
      expect(game.results.frames[6].secondRoll).toBe("/");
    });
  
  });
});

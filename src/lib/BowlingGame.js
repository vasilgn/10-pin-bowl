const { multipleRandomNumbersInRange } = require("../../utils/random");

const gameStatus = {
  FINISHED: "FINISHED",
  IN_PROGRESS: "IN_PROGRESS"
};

class BowlingGame {
  constructor(rolls) {
    this.rolls = rolls || [];
    this.status = gameStatus.IN_PROGRESS;
    this.frameIndex = 0;
    this.isLastFrame = false;
    if (this.rolls.length) {
      this._determineIndex();
    }
  }

  _determineIndex() {
    let currentFrameIndex = 0;

    for (let rollIndex = 0; rollIndex < this.rolls.length; ) {
      if (this.isStrike(rollIndex)) {
        rollIndex++;
      } else {
        rollIndex += 2;
      }
      currentFrameIndex += 1;
    }
    this.frameIndex = currentFrameIndex;
  }

  roll(pins) {
    this.rolls.push(pins);
    this._determineIndex();
  }

  get results() {
    var score = 0;
    const frames = [];

    for (
      let frameIndex = 0, rollIndex = 0;
      frameIndex < this.frameIndex;
      frameIndex++
    ) {
      if (this.isStrike(rollIndex)) {
        const currentScore = this.strikeBonus(rollIndex);
        score += currentScore;
        if (this.isLastFrame && frames.length == 9) {
          score += this.rolls[rollIndex + 2];
          frames.push({
            firstRoll: "X",
            secondRoll: this.isStrike(rollIndex + 1)
              ? "X"
              : this.rolls[rollIndex + 1],
            thirdRoll: this.isStrike(this.rolls[rollIndex + 2])
              ? "X"
              : this.rolls[rollIndex + 2],
            currentResult: currentScore + this.rolls[rollIndex + 2]
          });
        } else {
          frames.push({
            firstRoll: "X",
            currentResult: currentScore
          });
        }
        rollIndex++;
      } else if (this.isSpare(rollIndex)) {
        const currentScore = this.spareBonus(rollIndex);
        score += currentScore;
        if (this.isLastFrame && frames.length == 9) {
          score += this.rolls[rollIndex + 1];
          frames.push({
            firstRoll: this.rolls[rollIndex],
            secondRoll: "/",
            thirdRoll: this.rolls[rollIndex + 1],
            currentResult: currentScore + this.rolls[rollIndex + 1]
          });
        } else {
          frames.push({
            firstRoll: this.rolls[rollIndex],
            secondRoll: "/",
            currentResult: currentScore
          });
        }
        rollIndex += 2;
      } else {
        const currentScore = this.handleNaN(
          this.rolls[rollIndex] + this.rolls[rollIndex + 1]
        );
        score += currentScore;

        frames.push({
          firstRoll: this.handleNaN(this.rolls[rollIndex]),
          secondRoll: this.handleNaN(this.rolls[rollIndex + 1]),
          currentResult: currentScore
        });
        rollIndex += 2;
      }
    }

    return {
      score,
      framesCount: frames.length,
      frames: frames,
      status: this.status,
      rolls: this.rolls
    };
  }

  generateFrame() {
    let rolls = 2;

    if (!(this.frameIndex < 9)) {
      rolls = 3;
    }

    let pins = multipleRandomNumbersInRange(rolls, 0, 10, 0, 10);
    if (rolls < 3) {
      if (pins[0] === 10) {
        pins = pins.slice(0, 1);
      }
    }

    if (rolls === 3) {
      for (const p of pins) {
        this.rolls.push(p);
      }
      this.frameIndex = 10;
      this.isLastFrame = true;
      this.status = gameStatus.FINISHED;
    } else {
      for (const p of pins) {
        this.rolls.push(p);
      }
      this._determineIndex();
    }
  }

  isStrike(rollIndex) {
    return this.rolls[rollIndex] === 10;
  }
  strikeBonus(rollIndex) {
    const sum = 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
    if (!isNaN(sum)) return sum;
    return 0;
  }

  isSpare(rollIndex) {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }
  spareBonus(rollIndex) {
    const sum = 10 + this.rolls[rollIndex + 2];
    if (!isNaN(sum)) return sum;
    return 0;
  }

  handleNaN(num) {
    return !isNaN(num) ? num : 0;
  }
  static gameStatus = gameStatus;
}

module.exports = BowlingGame;

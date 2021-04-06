function multipleRandomNumbersInRange(n, min, max, minSum, maxSum) {
  if (min * n > maxSum || max * n < minSum) {
    throw "Impossible";
  }

  let nums = [];
  while (n--) {
    let thisMin = Math.max(min, minSum - n * max);
    let thisMax = Math.min(max, maxSum - n * min);
  
    let int = randomNumberBetween(thisMin, thisMax);
    minSum -= int;
    maxSum -= int;
    nums.push(int);
  }
  return nums;
}
function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.multipleRandomNumbersInRange = multipleRandomNumbersInRange;
module.exports.randomNumberBetween = randomNumberBetween;

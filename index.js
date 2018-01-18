class Die {
  constructor(size = 6) {
    this.state = new Array(size).fill(1);
  }

  roll() {
    // add all of the states up
    const sum = this.state.reduce((p, c) => p + c, 0);
    // get a random number of steps between 0 and the sum
    let steps = sum * Math.random();

    // find the target we hit
    let target = 0;
    while (steps >= 0) {
      steps -= this.state[target++];
    }

    // at this point, the target is what we want to return,
    // so use target-1 to update the zero-based states
    this.state = this.state.map((prev_state, index) =>
      (index === target - 1) ? 1 : prev_state + 1);

    return target;
  }
}

module.exports = Die;

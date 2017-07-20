
class Die {
  constructor(size) {
    size = size || 6;
    this.state = new Array(size).fill(1);
  }

  roll() {
    let steps = this.state.reduce((p, c) => p + c, 0) * Math.random();

    // find the target
    let target = 0;
    while (steps > 0) { 
      steps -= this.state[target++]; 
    }

    // at this point, the target is what we want to return, so use target-1 to update zero-based states
    this.state = this.state.map((value, index) => (index == target-1)? 1 : value + 1 );
    
    return target;
  }
}

module.exports = Die

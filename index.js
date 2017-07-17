
class Die {
  constructor(size) {
    size = size || 6
    this.state = []
    for (let i = 0; i < size; i++) {
      this.state[i] = 1
    }
  }

  roll() {
    // [  1,   3,   2]
    // [0-1, 1-4, 4-6]
    const sum = this.state.reduce((p, c) => p + c, 0)
    const r = Math.random() * sum
    let runningSum = 0
    let result = -1
    for (let i = 0; i < this.state.length; i++) {
      const mark = this.state[i]
      runningSum += mark
      if(r < runningSum && result === -1) {
        result = i
        this.state[i] = 1
      } else {
        this.state[i]++
      }
    }
    // Add 1, so the die roll is between 1 -> size of die
    return (result + 1)
  }
}

module.exports = Die

let BadDie = require('../index.js')
let t = require('tap')

t.test('is uniformly random eventually', function(t) {
  let gamblersDie = new BadDie(6)
  let result = [0, 0, 0, 0, 0, 0]

  // roll a million times and tabulate
  for (var i = 0; i < 1000000; i++) {
    result[gamblersDie.roll() - 1]++
  }
  // what the average should be
  const avg = 1000000 / 6
  // fail if any deviates from the average by more than 0.1%
  // anything more and it's suspicious and worth investagating
  for (var i = 0; i < result.length; i++) {
    t.ok(Math.abs((result[i] - avg) / 1000000) <= 0.001,
      `suspiciously not random. face:${i} ${((result[i] - avg) / 1000000 * 100).toFixed(3)}%`)
  }
  t.end()
})

t.test('is *consistently* uniformly random eventually', function(t) {
  for(let run = 0; run < 10; run++) {
    let gamblersDie = new BadDie(6)
    let result = [0, 0, 0, 0, 0, 0]

    // roll a million times and tabulate
    for (var i = 0; i < 1000000; i++) {
      result[gamblersDie.roll() - 1]++
    }
    // what the average should be
    const avg = 1000000 / 6
    // fail if any deviates from the average by more than 0.1%
    // anything more and it's suspicious and worth investagating
    for (var i = 0; i < result.length; i++) {
      t.ok(Math.abs((result[i] - avg) / 1000000) <= 0.001,
        `suspiciously not random. face:${i} ${((result[i] - avg) / 1000000 * 100).toFixed(2)}%`)
    }
  }
  t.end()
})

t.test('doesn\'t explode if large numbers are used.', function(t) {
  let gamblersDie = new BadDie(600)
  t.doesNotThrow(gamblersDie.roll.bind(gamblersDie), "The dice exploded.")
  t.end()
})

t.test('defaults exist', function(t) {
  let gamblersDie = new BadDie()
  t.doesNotThrow(gamblersDie.roll.bind(gamblersDie), "The dice exploded.")
  t.end()
})

t.test('actually non-uniform', function(t) {
  let gamblersDie = new BadDie()
  t.test('trivial example', function(t) {
    gamblersDie.state = [0,0,1,0,0,0]
    t.equals(gamblersDie.roll(), 3, "Die was actually random")
    t.end()
  })

  t.test('inferred example', function(t) {
    /**
      Given this state, [4,3,2,1]
        1 should be rolled 40% of the time
        2 should be rolled 30% of the time
        3 should be rolled 20% of the time
        4 should be rolled 10% of the time
     */
    let result = [0,0,0,0]
    for (let run = 0; run < 1000000; run++) {
      gamblersDie.state = [4,3,2,1]
      result[gamblersDie.roll() - 1]++
    }
    t.true(Math.abs(0.4 - result[0] / 1000000) < 0.001)
    t.true(Math.abs(0.3 - result[1] / 1000000) < 0.001)
    t.true(Math.abs(0.2 - result[2] / 1000000) < 0.001)
    t.true(Math.abs(0.1 - result[3] / 1000000) < 0.001)
    t.end()
  })

  t.end()
})

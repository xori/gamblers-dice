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
  // fail if any deviates from the average by more than 0.05%
  // anything more and it's suspicious and worth investagating
  for (var i = 0; i < result.length; i++) {
    t.ok(Math.abs((result[i] - avg) / 1000000) <= 0.0005,
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
    // fail if any deviates from the average by more than 0.05%
    // anything more and it's suspicious and worth investagating
    for (var i = 0; i < result.length; i++) {
      t.ok(Math.abs((result[i] - avg) / 1000000) <= 0.0005,
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

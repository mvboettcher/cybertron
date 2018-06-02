import test from 'tape'
import { map, filter, reduce, compose, prop } from 'nanofp'

const stars = [
  { first: 'elvis', last: 'presley', alive: true },
  { first: 'jim', last: 'morrison', alive: false },
  { first: 'bob', last: 'dylan', alive: true },
  { first: 'buddy', last: 'holly', alive: false }
]
const fullname = o => `${prop('first', o)} ${prop('last', o)}`

/* Level 3 - rockstars */
export default function() {
  const ex1 =
    'Use map to transform list of rockstar first,last name objects to objects with fullname'
  const exercise1 = _ => {

    function fullNamify(obj) {
    return { fullname:  `${obj['first']} ${obj['last']}`}
  }

    return map(fullNamify, stars)
    // // or...
    // const objectCreator = (str) => ({fullname: str})
    //    return map(objectCreator, map(fullname, stars))
  }

  const ex2 = 'Use filter to filter list of rockstars that are still alive'
  const exercise2 = _ => {

    const isAlive = star => star['alive']

    return filter(isAlive, stars)
  }

  const ex3 =
    'Use reduce and count the number of stars that are no longer living'
  const exercise3 = _ => {

    const isntAlive = star => star['alive'] === false

    function deadStars() {
      return filter(isntAlive, stars)
  }

    const countIt = (a, b) => a + 1

    return reduce(countIt, 0, deadStars())
  }

  const ex4 =
    'Use map, filter and reduce with compose show a concatenated string of the fullnames of each alive star'
  const exercise4 = _ => {

    const isAlive = star => star['alive']

    const stringIt = (a, b) => b

    return compose(
      reduce(stringIt, 0),
      map(fullname),
      filter(isAlive)
    )(stars)
}
  /* tests to validate exercises go here */
  test('test', assert => {
    assert.plan(4)
    assert.same(
      exercise1(),
      [
        { fullname: 'elvis presley' },
        { fullname: 'jim morrison' },
        { fullname: 'bob dylan' },
        { fullname: 'buddy holly' }
      ],
      ex1
    )

    assert.same(
      exercise2(),
      [{ first: 'bob', last: 'dylan', alive: true }],
      ex2
    )
    assert.equals(exercise3(), 3, ex3)
    assert.same(exercise4(), 'bob dylan', ex4)
  })
}

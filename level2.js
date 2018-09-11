import test from 'tape'
import hex2color from './lib/hex2color'
import { map, filter, reduce, compose } from 'nanofp'

export default function() {
  /* Level 2 - colors */

  const ex1 =
    'Use map and the hex2color function to convert list of hex values to list of colors'
  const exercise1 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']

    return hexes.map(hex2color)
  }

  const ex2 =
    'Use filter and the hex2color function to filter list of hex values to only list colors that are not blue, red, or green'
  const exercise2 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']

    function isNotRGB(hex) {
      if (
        hex2color(hex) !== 'red' &&
        hex2color(hex) !== 'green' &&
        hex2color(hex) !== 'blue'
      ) {
        return true
      }
      return false
    }

    return hexes.filter(isNotRGB)
  }

  const ex3 =
    'Use reduce and the hex2color function to count list of hex values than have r in their name'
  const exercise3 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']

    const containsR = hex => hex2color(hex).includes('r')

    const colorsWithR = hexes.filter(containsR)

    const countIt = a => a + 1

    return colorsWithR.reduce(countIt, 0)
  }

  const ex4 =
    'Use map, filter and reduce with compose to convert all hex codes to colors then filter out (blue, red, green) and count all the colors that contain a "b"'
  const exercise4 = _ => {
    const hexes = ['#0000ff', '#f5f5dc', '#cd853f', '#663399', '#ffa500']
    // const blackList = ['red', 'green', 'blue']
    // const isNotRGB = color => (blackList.indexOf(color) < 0)

    const isNotRGB = hex => hex !== 'red' && hex !== 'green' && hex !== 'blue'

    const doesntContainB = hex => hex.includes('b')

    const countIt = a => a + 1

    return hexes
      .map(hex2color)
      .filter(isNotRGB)
      .filter(doesntContainB)
      .reduce(countIt, 0)
  }

  /* tests to validate exercises go here */
  test('test', assert => {
    assert.plan(4)
    assert.same(
      exercise1(),
      ['blue', 'beige', 'peru', 'rebeccapurple', 'orange'],
      ex1
    )
    assert.same(exercise2(), ['#f5f5dc', '#cd853f', '#663399', '#ffa500'], ex2)
    assert.equals(exercise3(), 3, ex3)
    assert.equals(exercise4(), 2, ex4)
  })
}

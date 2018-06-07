import test from 'tape'
import getCards from './lib/get-cards'
import { map, filter, reduce, compose } from 'nanofp'

export default function() {
  const ex1 = 'Use map to transform list of card data to list of images'
  const exercise1 = _ => {
    const data = getCards()
    const deck = data['cards']

    const cardImage = card => `<img src=${card['image']} />`

    return map(cardImage, deck)
  }

  const ex2 = 'Use filter to filter list of cards of the suit clubs'
  const exercise2 = _ => {
    const data = getCards()
    const deck = data['cards']

    const cardSuit = obj => obj['suit'] === 'CLUBS'

    return filter(cardSuit, deck)
  }

  const ex3 =
    'Use reduce and count the number of cards that have a value of 8 or value of 6'
  const exercise3 = _ => {
    const data = getCards()
    const deck = data['cards']

    const value8or6 = obj => obj['value'] === '8' || obj['value'] === '6'

    const newDeck = filter(value8or6, deck)

    const countIt = x => x + 1

    return reduce(countIt, 0, newDeck)
  }

  const ex4 = `Use map, filter and reduce with compose
    to show all cards as images that contain values of 8 or 6`
  const exercise4 = _ => {
    const data = getCards()
    const deck = data['cards']

    const value8or6 = obj => obj['value'] === '8' || obj['value'] === '6'

    const cardImage = obj => `<img src=${obj['image']} />`

    const sumItUp = 

    return compose(
      reduce(sumItUp)
      map(cardImage),
      filter(value8or6),
    )(deck)
  }

  /* tests to validate exercises go here */
  test('test', assert => {
    assert.plan(4)
    assert.same(
      exercise1(),
      [
        '<img src=http://deckofcardsapi.com/static/img/6H.png />',
        '<img src=http://deckofcardsapi.com/static/img/7H.png />',
        '<img src=http://deckofcardsapi.com/static/img/KS.png />',
        '<img src=http://deckofcardsapi.com/static/img/2D.png />',
        '<img src=http://deckofcardsapi.com/static/img/QS.png />',
        '<img src=http://deckofcardsapi.com/static/img/0C.png />',
        '<img src=http://deckofcardsapi.com/static/img/8H.png />',
        '<img src=http://deckofcardsapi.com/static/img/JD.png />',
        '<img src=http://deckofcardsapi.com/static/img/8C.png />'
      ],
      ex1
    )

    assert.same(
      exercise2(),
      [
        {
          code: '0C',
          image: 'http://deckofcardsapi.com/static/img/0C.png',
          images: {
            png: 'http://deckofcardsapi.com/static/img/0C.png',
            svg: 'http://deckofcardsapi.com/static/img/0C.svg'
          },
          suit: 'CLUBS',
          value: '10'
        },
        {
          code: '8C',
          image: 'http://deckofcardsapi.com/static/img/8C.png',
          images: {
            png: 'http://deckofcardsapi.com/static/img/8C.png',
            svg: 'http://deckofcardsapi.com/static/img/8C.svg'
          },
          suit: 'CLUBS',
          value: '8'
        }
      ],
      ex2
    )
    assert.equals(exercise3(), 3, ex3)
    assert.equals(
      exercise4(),
      '<img src=http://deckofcardsapi.com/static/img/6H.png /><img src=http://deckofcardsapi.com/static/img/8H.png /><img src=http://deckofcardsapi.com/static/img/8C.png />',
      ex4
    )
  })
}

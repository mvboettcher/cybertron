import R from 'ramda'
import fetch from 'isomorphic-fetch'
import test from 'tape'

/**
 * Level 6
 *
 * Ramda all the things
 */

/**
 * Level 6 - Challenge 1
 *
 * find - applies a function to each element of an array and returns the first element for which the function returns a truthy value.
 *
 * you have a deck of cards, the cards array is a property on the deck object.
 * you can inspect the shape of the cards object by doing a console.log(JSON.stringify(___, null, 2))
 *
 * Challenge:
 *   Use the find function to find the Ace of Clubs and return that card to the
 *   caller.
 *
 *   HINT: a common mapper method is obj => obj.property = 'somevalue' -
 *   this function is used so often there is a function in ramda that makes this
 *   easier to implement called propEq
 *
 *   http://ramdajs.com/docs/#propEq
 *
 *   (See if you can use propEq in this challenge)
 */
const challenge1 = deck => {
  // show card object
  // console.log(JSON.stringify(deck.cards[0], null, 2))
  const { find, propEq } = R

  return deck['cards'].find(card => card['code'] === 'AC')

  // return find(propEq('code', 'AC'))(deck.cards)
}

/** Level 6 = Challenge 2
 *
 * Challenge:
 *   Find all of the one eyed royals and suicide king
 *   then transfrom the obects to array of card images
 *   finally just a string of images.
 *
 *  HINT: break down everything into smaller pieces
 *
 * http://ramdajs.com/docs/#anypass
 * http://ramdajs.com/docs/#propEq
 * http://ramdajs.com/docs/#join
 * http://ramdajs.com/docs/#path
 *
 */
const challenge2 = deck => {
  const { compose, map, filter, anyPass, propEq, join, path } = R
  // JS JH KD

  const isOneEyedRoyal = card =>
    card['code'] === 'JS' || card['code'] === 'JH' || card['code'] === 'KD'

  const returnImage = card => card['image']

  return deck['cards']
    .filter(isOneEyedRoyal)
    .map(returnImage)
    .join(', ')
}

/** level 6 - Challenge 3
 *
 * Challenge:

 * Build a Full House in one Reduce
 *
 * Using reduce iterate through the cards and
 *   create a full house, which means
 *   three of the cards have to be the same value
 *   and two of  the cards have be the same value
 *   for a total of 5 cards.
 *
 * You can pick your on fullhouse then call validate
 *
 *  const hand = ['3S', '3H', '3C', 'AH', 'AS']
 *  use reduce to create an array of cards
 *  then use validate to check your work
 *  validate(result, hand)
 *
 *  Check out contains, prop, append, always, ifElse from ramdajs
 */
const challenge3 = (deck, validate) => {
  const { reduce, append, __, ifElse, compose, contains, prop, always } = R
  const correcthand = ['3S', '3H', '3C', 'AH', 'AS'] // create your own
  const myhand = [] // add your code here
  validate(myhand, correcthand)
}

/**
 * Level 6 - Challenge 4
 *
 * 52 Card Pickup
 *
 * Challenge, given a deck of card use the ramda sort and prop
 * functions to put the cards in order by the code prop.
 *
 */
const challenge4 = deck => {
  const { sort, prop } = R
  return sort((card1, card2) => {
    if (prop('code', card1) < prop('code', card2)) {
      return -1
    } else {
      return 1
    }
  }, deck.cards)
}

export default () => {
  fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
    .then(res => res.json())
    .then(results => {
      const deck = results
      test('Level 6 - Challenge 1', t => {
        t.plan(1)
        t.deepEquals(challenge1(deck), {
          suit: 'CLUBS',
          value: 'ACE',
          images: {
            svg: 'http://deckofcardsapi.com/static/img/AC.svg',
            png: 'http://deckofcardsapi.com/static/img/AC.png'
          },
          image: 'http://deckofcardsapi.com/static/img/AC.png',
          code: 'AC'
        })
      })

      test('Level 6 - Challenge 2', t => {
        t.plan(4)
        const { contains, or } = R
        const results = challenge2(deck)

        t.ok(contains('img/KH', or(results, '')))
        t.ok(contains(`img/KD`, or(results, '')))
        t.ok(contains(`img/JH`, or(results, '')))
        t.ok(contains(`img/JS`, or(results, '')))
      })

      test('Level 6 - Challenge 3', t => {
        const { pluck, sort, lt } = R
        t.plan(1)
        const desc = (a, b) => (lt(a, b) ? -1 : 1)
        challenge3(deck, (actualHand, correctHand) => {
          t.deepEquals(
            sort(desc, pluck('code', actualHand)),
            sort(desc, correctHand)
          )
        })
      })

      test('Level 6 - Challenge 4', t => {
        const { pluck } = R
        t.plan(1)
        const actual = pluck('code', challenge4(deck))
        t.deepEquals(actual, [
          '0C',
          '0D',
          '0H',
          '0S',
          '2C',
          '2D',
          '2H',
          '2S',
          '3C',
          '3D',
          '3H',
          '3S',
          '4C',
          '4D',
          '4H',
          '4S',
          '5C',
          '5D',
          '5H',
          '5S',
          '6C',
          '6D',
          '6H',
          '6S',
          '7C',
          '7D',
          '7H',
          '7S',
          '8C',
          '8D',
          '8H',
          '8S',
          '9C',
          '9D',
          '9H',
          '9S',
          'AC',
          'AD',
          'AH',
          'AS',
          'JC',
          'JD',
          'JH',
          'JS',
          'KC',
          'KD',
          'KH',
          'KS',
          'QC',
          'QD',
          'QH',
          'QS'
        ])
      })
    })
}

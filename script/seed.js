/* eslint-disable camelcase */
'use strict'

const db = require('../server/db')
const {User, Stock, Portfolio, Transaction} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'stack',
      email: 'cody@email.com',
      password: '123'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'full',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const stocks = await Promise.all([
    Stock.create({
      name: 'Advanced Micro Devices, Inc.',
      symbol: 'AMD'
    }),
    Stock.create({
      name: 'Apple, Inc.',
      symbol: 'AAPL'
    }),
    Stock.create({
      name: 'Target Corp.',
      symbol: 'TGT'
    }),
    Stock.create({
      name: 'Inovio Pharmaceuticals, Inc.',
      symbol: 'INO'
    })
  ])

  const portfolios = await Promise.all([
    Portfolio.create({
      name: 'codys portfolio',
      balance: 200000,
      user_id: 1
    }),
    Portfolio.create({
      name: 'codys 2nd portfolio',
      balance: 300000,
      user_id: 1
    }),
    Portfolio.create({
      name: 'murphys portfolio',
      balance: 150000,
      user_id: 2
    })
  ])

  const transactions = await Promise.all([
    Transaction.create({
      stock_id: 1,
      portfolio_id: 1,
      quantity: 5,
      amount: 473,
      purchase: true
    }),
    Transaction.create({
      stock_id: 2,
      portfolio_id: 2,
      quantity: 6,
      amount: 500,
      purchase: true
    }),
    Transaction.create({
      stock_id: 3,
      portfolio_id: 3,
      quantity: 3,
      amount: 300,
      purchase: true
    }),
    Transaction.create({
      stock_id: 4,
      portfolio_id: 1,
      quantity: 7,
      amount: 100,
      purchase: true
    }),
    Transaction.create({
      stock_id: 1,
      portfolio_id: 1,
      quantity: 2,
      amount: 200,
      purchase: false
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${stocks.length} users`)
  console.log(`seeded ${portfolios.length} users`)
  console.log(`seeded ${transactions.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

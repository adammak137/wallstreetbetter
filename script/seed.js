'use strict'

const db = require('../server/db')
const {User, Stock, Portfolio, Transactions} = require('../server/db/models')

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
      userId: 1
    }),
    Portfolio.create({
      name: 'codys 2nd portfolio',
      balance: 300000,
      userId: 1
    }),
    Portfolio.create({
      name: 'murphys portfolio',
      balance: 150000,
      userId: 2
    })
  ])

  const transactions = await Promise.all([
    Transactions.create({
      stockId: 1,
      portfolioId: 1,
      quantity: 5,
      amount: 473,
      purchase: true
    }),
    Transactions.create({
      stockId: 2,
      portfolioId: 1,
      quantity: 6,
      amount: 500,
      purchase: true
    }),
    Transactions.create({
      stockId: 3,
      portfolioId: 1,
      quantity: 3,
      amount: 300,
      purchase: true
    }),
    Transactions.create({
      stockId: 4,
      portfolioId: 1,
      quantity: 7,
      amount: 100,
      purchase: true
    }),
    Transactions.create({
      stockId: 3,
      portfolioId: 1,
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

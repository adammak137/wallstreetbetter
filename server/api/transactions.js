/* eslint-disable camelcase */
const router = require('express').Router()
const {Transaction} = require('../db/models')
const db = require('../db/db')
const sequelize = require('sequelize')
module.exports = router

//used to get all of the transactions for a particular user
router.get('/', async (req, res, next) => {
  try {
    const user_id = req.session.passport.user
    let allTransactions = await db.query(
      `SELECT
      transactions.id as id,
      transactions.quantity as quantity,
      transactions.amount as amount,
      transactions.purchase as purchase,
      stocks.name as name,
      stocks.symbol as symbol,
      transactions."createdAt" as date,
     portfolios.name as portfolioname
      FROM transactions
      LEFT JOIN stocks on transactions.stock_id = stocks.id
      LEFT JOIN portfolios on transactions.portfolio_id = portfolios.id
      LEFT JOIN users on portfolios.user_id = users.id
      WHERE users.id = ${user_id}
      ORDER BY transactions."createdAt" DESC
        `,
      {type: db.QueryTypes.SELECT}
    )
    res.json(allTransactions)
  } catch (error) {
    next(error)
  }
})

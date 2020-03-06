/* eslint-disable camelcase */
const router = require('express').Router()
const {User, Portfolio} = require('../db/models')
const db = require('../db/db')
const axios = require('axios')
const tokenKey = process.env.IEX
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/transactions/:portfolioId?', async (req, res, next) => {
  try {
    console.log(req.body)
    const user_id = req.params.userId
    const portfolio_id = req.params.portfolioId
    if (!portfolio_id) {
      let allTransactions = await db.query(
        `SELECT
         portfolios.name as PortfolioName,
         transactions.quantity as Quantity,
         transactions.amount as Amount,
         transactions.purchase as Purchase
         FROM portfolios
         LEFT JOIN transactions on portfolios.id = transactions.portfolio_id
         WHERE portfolios.user_id = ${user_id}
         GROUP BY PortfolioName, Quantity, Amount, Purchase
        `,
        {type: db.QueryTypes.SELECT}
      )
      res.json(allTransactions)
    } else {
      let allTransactions = await db.query(
        `SELECT
         portfolios.name as PortfolioName,
         transactions.quantity as Quantity,
         transactions.amount as Amount,
         transactions.purchase as Purchase
         FROM portfolios
         LEFT JOIN transactions on portfolios.id = transactions.portfolio_id
         WHERE portfolios.user_id = ${user_id} AND portfolios.id = ${portfolio_id}
         GROUP BY PortfolioName, Quantity, Amount, Purchase
        `,
        {type: db.QueryTypes.SELECT}
      )
      res.json(allTransactions)
    }
  } catch (error) {
    next(error)
  }
})

//If no portfoilioID is sent the API will send a list of all portfolio names, if a portfolioId is sent then the route will send a list of all the stocks within a specific portfolio
router.get('/portfolios/:portfolioId?', async (req, res, next) => {
  try {
    const user_id = req.session.passport.user
    const portfolioId = req.params.portfolioId
    if (!portfolioId) {
      let allPortfolios = await Portfolio.findAll({
        where: {user_id},
        attributes: {exclude: ['createdAt', 'updatedAt', 'userId']}
      })
      res.json(allPortfolios)
    } else {
      let stockPortfolio = await db.query(
        `SELECT
        SUM(CASE WHEN Transactions.purchase = True THEN Transactions.quantity ELSE Transactions.quantity * -1 END) as TotalQuantity,
        Stocks.name as Name,
        Stocks.symbol as Symbol
        FROM Transactions
        LEFT JOIN Stocks On Transactions.stock_id = Stocks.id
        WHERE portfolio_id = ${portfolioId}
        GROUP By Name, Symbol
        `,
        {type: db.QueryTypes.SELECT}
      )
      //In order to display the change we need to query for the last close price by doing a batch request
      let stockArray = []
      stockPortfolio.forEach(val => {
        stockArray.push(val.symbol.toLowerCase())
      })

      let {data} = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${stockArray.join(
          ','
        )}&token=${tokenKey}&types=quote&filter=latestPrice,previousClose`
      )

      // Go through each stock and append the data found
      stockPortfolio.forEach(stockInPort => {
        let symbol = stockInPort.symbol
        stockInPort.latestPrice = data[symbol].quote.latestPrice
        stockInPort.previousClose = data[symbol].quote.previousClose
      })
      res.json(stockPortfolio)
    }
  } catch (err) {
    next(err)
  }
})

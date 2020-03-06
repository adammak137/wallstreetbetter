/* eslint-disable camelcase */
const router = require('express').Router()
const {Portfolio} = require('../db/models')
const db = require('../db/db')
const axios = require('axios')
const tokenKey = process.env.IEX
module.exports = router

router.get('/:portfolioId?', async (req, res, next) => {
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

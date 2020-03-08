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
        attributes: {exclude: ['createdAt', 'updatedAt', 'user_id']}
      })
      res.json(allPortfolios)
    } else {
      let singlePortfolio = await Portfolio.findAll({
        where: {id: portfolioId},
        attributes: {exclude: ['createdAt', 'updatedAt', 'user_id']}
      })
      res.json(singlePortfolio)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:portfolioId/stocks', async (req, res, next) => {
  try {
    const portfolioId = req.params.portfolioId
    let stockPortfolio = await db.query(
      `SELECT
          SUM(CASE WHEN Transactions.purchase = True THEN Transactions.quantity ELSE Transactions.quantity * -1 END) as totalquantity,
          Stocks.name as Name,
          Stocks.symbol as Symbol
          FROM Transactions
          LEFT JOIN Stocks On Transactions.stock_id = Stocks.id
          WHERE portfolio_id = ${portfolioId}
          GROUP By Name, Symbol
          HAVING ( SUM(CASE WHEN Transactions.purchase = True THEN Transactions.quantity ELSE Transactions.quantity * -1 END) ) > 0
          `,
      {type: db.QueryTypes.SELECT}
    )
    //In order to display the change we need to query for the last close price by doing a batch request
    if (stockPortfolio.length === 0) {
      res.json({stickPortfolio: {}, stockMap: {}})
    } else {
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
      // Stock list is used to enable and disable buttons on the front end
      let stockMap = {}
      stockPortfolio.forEach(stockInPort => {
        let symbol = stockInPort.symbol
        stockInPort.latestPrice = data[symbol].quote.latestPrice
        stockInPort.previousClose = data[symbol].quote.previousClose
        stockMap[symbol] = stockInPort.totalquantity
      })
      res.json({stockPortfolio, stockMap})
    }
  } catch (error) {
    next(error)
  }
})

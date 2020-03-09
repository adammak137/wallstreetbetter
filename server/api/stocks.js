/* eslint-disable camelcase */
const router = require('express').Router()
const axios = require('axios')
const tokenKey = process.env.IEX
const {Stock, Portfolio, Transaction} = require('../db/models/index')
const db = require('../db/db')
module.exports = router

//Stock price for one particular symbol
router.get('/:symbol', async (req, res, next) => {
  try {
    /*
    using previous close for price open because
    All response attributes related to 15 minute delayed market-wide price data are only available to paid subscribers.
  */
    let stockInfo = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${
        req.params.symbol
      }/book?token=${tokenKey}&types=quote&filter=symbol,companyName,latestPrice, changePercent, previousClose`
    )
    res.json(stockInfo.data)
  } catch (error) {
    next(error)
  }
})

//used to buy a particular stock,
router.put('/buy', async (req, res, next) => {
  try {
    /*We need to check on the back end, for security reasons and the nature of a constantly updating market, if this stock ticker exists and its current price
    get the portfolio balance and calculate if the user is able to buy this stock at this quantity
    If they can buy the stock then we will find or create the stock,
    create the transaction and then deduct from the portfolio balance
    */
    const portfolioId = req.body.portfolioId
    const symbol = req.body.symbol
    const quantity = req.body.quantity
    const stockInfo = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/book?token=${tokenKey}&types=quote&filter=symbol,companyName,latestPrice, changePercent, previousClose`
    )

    const singlePortfolio = await Portfolio.findAll({
      where: {id: portfolioId},
      attributes: {exclude: ['createdAt', 'updatedAt', 'user_id']}
    })

    const balance = singlePortfolio[0].dataValues.balance
    //edge cases where result may come in where values have trailing 9s
    const calculatedPrice = Math.round(
      stockInfo.data.quote.latestPrice * 100 * quantity
    )
    if (calculatedPrice > balance) {
      res
        .send(
          'Sorry the stock price has changed and your balance is not enough to complete this transaction'
        )
        .status(401)
    } else {
      const dbStock = await Stock.findOrCreate({
        where: {symbol: stockInfo.data.quote.symbol},
        defaults: {name: stockInfo.data.quote.companyName}
      })

      await Transaction.create({
        stock_id: dbStock[0].dataValues.id,
        portfolio_id: portfolioId,
        quantity: quantity,
        amount: calculatedPrice,
        purchase: true
      })
      const newBalance = balance - calculatedPrice
      await Portfolio.update({balance: newBalance}, {where: {id: portfolioId}})
      res.json('congratulations you have succesfully purchased the stock')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/sell', async (req, res, next) => {
  try {
    /*We need to find the stock id in our database by finding it on   the exchange first
      then we will tally up the amount of that particular stock in the transaction table for the portfolio.
      Then calculate the stock price with the quantity sold
      create a transaction and then update the balance
    */
    const portfolioId = req.body.portfolioId
    const symbol = req.body.symbol
    const quantity = req.body.quantity
    //finding stock information such as price and if it is a valid symbol
    const stockInfo = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/book?token=${tokenKey}&types=quote&filter=symbol,companyName,latestPrice, changePercent, previousClose`
    )
    //finding the stock id needed
    const dbStock = await Stock.findAll({
      where: {symbol: stockInfo.data.quote.symbol},
      defaults: {name: stockInfo.data.quote.companyName}
    })
    //finding the portfolio balance
    const singlePortfolio = await Portfolio.findAll({
      where: {id: portfolioId},
      attributes: {exclude: ['createdAt', 'updatedAt', 'user_id']}
    })

    //finding a tally of the amount of stocks a portfolio has
    let stockPortfolio = await db.query(
      `SELECT
        SUM(CASE WHEN Transactions.purchase = True THEN Transactions.quantity ELSE Transactions.quantity * -1 END) as TotalQuantity
        FROM Transactions
        WHERE portfolio_id = ${portfolioId} AND stock_id = ${
        dbStock[0].dataValues.id
      }
        GROUP By stock_id
        `,
      {type: db.QueryTypes.SELECT}
    )
    //if user is trying to sell more than the amount in the portfolio they will be given a message
    let portfolioStockQuant = stockPortfolio[0].totalquantity
    if (quantity > portfolioStockQuant) {
      res
        .send(`You do not have enough of this stock to sell ${quantity}`)
        .status(401)
    } else {
      //calculation
      //edge cases where result may come in where values have trailing 9s
      const balance = singlePortfolio[0].dataValues.balance
      const calculatedPrice = Math.round(
        stockInfo.data.quote.latestPrice * 100 * quantity
      )

      await Transaction.create({
        stock_id: dbStock[0].dataValues.id,
        portfolio_id: portfolioId,
        quantity: quantity,
        amount: calculatedPrice,
        purchase: false
      })
      const newBalance = balance + calculatedPrice
      await Portfolio.update({balance: newBalance}, {where: {id: portfolioId}})
      //update balance

      res.send('congratulations you have sucessfully sold the stock')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let batchString = req.body.stocks.join(',')
    let stockInfo = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${batchString}&token=${tokenKey}&types=chart,quote&filter=latestPrice,previousClose`
    )
    res.json(stockInfo.data)
  } catch (error) {
    next(error)
  }
})

/* eslint-disable camelcase */
const router = require('express').Router()
const axios = require('axios')
const tokenKey = process.env.IEX
const {Stock, Portfolio, Transaction} = require('../db/models/index')
module.exports = router

router.get('/:symbol', async (req, res, next) => {
  try {
    /*
    using previous close for price open because
    All response attributes related to 15 minute delayed market-wide price data are only available to paid subscribers.
  */
    let stockInfo = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${
        req.params.symbol
      }/book?token=${tokenKey}&types=quote&filter=symbol,companyName,latestPrice, changePercent, previousClose`
    )
    res.json(stockInfo.data)
  } catch (error) {
    next(error)
  }
})

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
      `https://sandbox.iexapis.com/stable/stock/${symbol}/book?token=${tokenKey}&types=quote&filter=symbol,companyName,latestPrice, changePercent, previousClose`
    )

    const singlePortfolio = await Portfolio.findAll({
      where: {id: portfolioId},
      attributes: {exclude: ['createdAt', 'updatedAt', 'user_id']}
    })

    const balance = singlePortfolio[0].dataValues.balance
    const calculatedPrice = stockInfo.data.quote.latestPrice * 100 * quantity

    if (calculatedPrice > balance) {
      res
        .json(
          'sorry the stock price has changed and your balance is not enough to complete this transaction'
        )
        .status(406)
    }
    // console.log(stockInfo.data.quote.)
    const createdStock = await Stock.findOrCreate({
      where: {symbol: stockInfo.data.quote.symbol},
      defaults: {name: stockInfo.data.quote.companyName}
    })

    await Transaction.create({
      stock_id: createdStock[0].dataValues.id,
      portfolio_id: portfolioId,
      quantity: quantity,
      amount: calculatedPrice,
      purchase: true
    })
    const newBalance = balance - calculatedPrice
    let updatedPort = await Portfolio.update(
      {balance: newBalance},
      {where: {id: portfolioId}}
    )
    console.log(updatedPort, portfolioId, newBalance)
    res.json('purchase successful')
  } catch (error) {
    next(error)
  }
})

router.put('/sell', async (req, res, next) => {
  try {
    console.log(req.body)
    res.json('purchase successful')
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let batchString = req.body.stocks.join(',')
    let stockInfo = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${batchString}&token=${tokenKey}&types=chart,quote&filter=latestPrice,previousClose`
    )
    res.json(stockInfo.data)
  } catch (error) {
    next(error)
  }
})

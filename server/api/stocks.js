const router = require('express').Router()
const axios = require('axios')
const tokenKey = process.env.IEX
module.exports = router

router.get('/:ticker', async (req, res, next) => {
  try {
    /*
    using previous close for price open because
    All response attributes related to 15 minute delayed market-wide price data are only available to paid subscribers.
  */
    let stockInfo = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${
        req.params.ticker
      }/book?token=${tokenKey}&types=quote&filter=symbol,latestPrice, changePercent, previousClose`
    )
    res.json(stockInfo.data)
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

import axios from 'axios'
import history from '../history'
import {setPortfolioId} from './user'

/**
 * ACTION TYPES
 */

const GET_STOCKS = 'GET_STOCKS'
/**
 * INITIAL STATE
 */
const defaultStocks = {portfolioStocks: [], searchStock: {}}

/**
 * ACTION CREATORS
 */

const getStocks = stocks => {
  return {
    type: GET_STOCKS,
    stocks
  }
}

export const portfolioStocks = portfolioId => async dispatch => {
  try {
    const sample = [
      {
        totalquantity: '3',
        name: 'Apple, Inc.',
        symbol: 'AAPL',
        latestPrice: 308.74,
        previousClose: 292.14
      },
      {
        totalquantity: '7',
        name: 'Inovio Pharmaceuticals, Inc.',
        symbol: 'INO',
        latestPrice: 8.092,
        previousClose: 7.79
      },
      {
        totalquantity: '3',
        name: 'Advanced Micro Devices',
        symbol: 'AMD',
        latestPrice: 308.74,
        previousClose: 292.14
      },
      {
        totalquantity: '7',
        name: 'Intel',
        symbol: 'INT',
        latestPrice: 8.092,
        previousClose: 7.79
      },
      {
        totalquantity: '3',
        name: 'Joke',
        symbol: 'TEST',
        latestPrice: 308.74,
        previousClose: 292.14
      },
      {
        totalquantity: '7',
        name: 'TESTING',
        symbol: 'TST',
        latestPrice: 8.092,
        previousClose: 7.79
      }
    ]
    // const { data } = await axios.get('/api/portfolios/portfolioId')
    dispatch(getStocks(sample))
    dispatch(setPortfolioId(portfolioId))
    history.push('/trade')
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultStocks, action) {
  console.log(action.stocks)
  switch (action.type) {
    case GET_STOCKS:
      return {...state, portfolioStocks: action.stocks}
    default:
      return state
  }
}

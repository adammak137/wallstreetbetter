import axios from 'axios'
import history from '../history'
import {setPortfolioOnUser} from './user'

/**
 * ACTION TYPES
 */

const GET_STOCKS = 'GET_STOCKS'
const SEARCH_STOCK = 'SEARCH_STOCK'
/**
 * INITIAL STATE
 */
const defaultStocks = {portfolioStocks: [], searchStock: {}, stockMap: {}}

/**
 * ACTION CREATORS
 */

const getStocks = stocks => {
  return {
    type: GET_STOCKS,
    stocks
  }
}

const searchingStock = stock => {
  return {
    type: SEARCH_STOCK,
    stock
  }
}

export const portfolioStocks = portfolioId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/portfolios/${portfolioId}/stocks`)
    dispatch(getStocks(data))
    dispatch(setPortfolioOnUser(portfolioId))
    history.push('/trade')
  } catch (error) {
    console.error(error)
  }
}

export const searchStock = symbol => async dispatch => {
  try {
    const formatSymbol = symbol.toLowerCase()
    const {data} = await axios.get(`/api/stocks/${formatSymbol}`)
    dispatch(searchingStock(data.quote))
  } catch (error) {
    console.error(error)
  }
}

export const buySellStock = transaction => async dispatch => {
  try {
    const {transactionType, portfolioId} = transaction
    await axios.put(`/api/stocks/${transactionType}`, transaction)
    dispatch(portfolioStocks(portfolioId))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultStocks, action) {
  switch (action.type) {
    case SEARCH_STOCK:
      return {...state, searchStock: action.stock}
    case GET_STOCKS:
      return {
        ...state,
        portfolioStocks: action.stocks.stockPortfolio,
        stockMap: action.stocks.stockMap
      }
    default:
      return state
  }
}

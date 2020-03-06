import axios from 'axios'
import history from '../history'
import {setPortfolioId} from './user'
/**
 * ACTION TYPES
 */

const GET_PORTFOLIOS = 'GET_PORTFOLIOS'
const GET_A_PORTFOLIO = 'GET_A_PORTFOLIO'

/**
 * INITIAL STATE
 */
const defaultPortfolios = []

/**
 * ACTION CREATORS
 */
const getPortfolios = portfolios => {
  return {
    type: GET_PORTFOLIOS,
    portfolios
  }
}

const getAPortfolio = portfolio => {
  return {
    type: GET_A_PORTFOLIO,
    portfolio
  }
}

/**
 * THUNK CREATORS
 */

export const allPortfolios = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolios')
    dispatch(getPortfolios(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultPortfolios, action) {
  switch (action.type) {
    case GET_PORTFOLIOS:
      return action.portfolios
    case GET_A_PORTFOLIO:
      return action.portfolio
    default:
      return state
  }
}

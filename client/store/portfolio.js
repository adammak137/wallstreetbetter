import axios from 'axios'

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

/**
 * THUNK CREATORS
 */

//New state with all of the portfolios listed
export const allPortfolios = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/portfolios')
    dispatch(getPortfolios(data))
  } catch (error) {
    console.error(error)
  }
}

//posts a new portfolio and dispatches an update for the new state of portfolios
export const createPortfolio = (
  portfolioName = 'Default portfolio'
) => async dispatch => {
  try {
    await axios.post('/api/portfolios', {portfolioName})
    dispatch(allPortfolios())
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

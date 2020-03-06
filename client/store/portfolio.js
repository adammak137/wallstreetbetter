import axios from 'axios'
/**
 * ACTION TYPES
 */

const GET_PORTFOLIOS = 'GET_PORTFOLIOS'

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
    default:
      return state
  }
}

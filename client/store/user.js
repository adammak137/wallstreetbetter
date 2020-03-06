import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_PORTFOLIO = 'SET_PORTFOLIO'

/**
 * INITIAL STATE
 */
const defaultUser = {currentPortfolio: Infinity}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const setPortfolio = portfolioId => ({type: SET_PORTFOLIO, portfolioId})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const setPortfolioId = portfolioId => dispatch => {
  dispatch(setPortfolio(portfolioId))
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case SET_PORTFOLIO:
      return {...state, currentPortfolio: action.portfolioId}
    case GET_USER:
      return {...state, ...action.user}
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

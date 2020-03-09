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
const defaultUser = {currentPortfolio: {}}

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

//used to either login or signup
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

//logout a user
export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

//sets the portfolio id currently being looked at onto the user
export const setPortfolioOnUser = portfolioId => async dispatch => {
  try {
    let {data} = await axios.get(`/api/portfolios/${portfolioId}`)
    dispatch(setPortfolio(data[0]))
  } catch (error) {
    console.error(error)
  }
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

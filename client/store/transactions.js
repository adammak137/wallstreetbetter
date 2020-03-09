import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultTransactions = []

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => {
  return {
    type: GET_ALL_TRANSACTIONS,
    transactions
  }
}
//gets all of the transactions for a particular user
export const getAllTransactions = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/transactions')
    dispatch(getTransactions(data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return action.transactions
    default:
      return state
  }
}

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import portfolios from './portfolio'
import stocks from './stock'
import transactions from './transactions'

//combines all of the reducers, adds middleware for thunks and logging and then creates a store
const reducer = combineReducers({user, portfolios, stocks, transactions})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

const User = require('./user')
const Stock = require('./stock')
const Portfolio = require('./portfolio')
// const PortfolioTracker = require('./portfolioTracker')
const Transaction = require('./transactions')
//Creates the Transaction through table association
Portfolio.belongsToMany(Stock, {
  through: {model: Transaction, unique: false},
  constraints: false,
  foreignKey: 'portfolio_id'
})
Stock.belongsToMany(Portfolio, {
  through: {model: Transaction, unique: false},
  constraints: false,
  foreignKey: 'stock_id'
})

// //User has many portfoilios portfolios has one user
User.hasMany(Portfolio, {
  foreignKey: 'user_id'
})
Portfolio.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Stock,
  Portfolio,
  Transaction
}

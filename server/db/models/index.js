const User = require('./user')
const Stock = require('./stock')
const Portfolio = require('./portfolio')
const PortfolioTracker = require('./portfolioTracker')
const Transactions = require('./transactions')
//Creates the Transaction through table association
User.belongsToMany(Stock, {through: Transactions})
Stock.belongsToMany(User, {through: Transactions})
Portfolio.belongsToMany(User, {through: Transactions})
Portfolio.belongsToMany(Stock, {through: Transactions})

// //Create the Portfolio tracker association
Portfolio.belongsToMany(Stock, {through: PortfolioTracker})
Stock.belongsToMany(Portfolio, {through: PortfolioTracker})

// //User has many portfoilios portfolios has one user
User.hasMany(Portfolio)
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
  PortfolioTracker,
  Transactions
}

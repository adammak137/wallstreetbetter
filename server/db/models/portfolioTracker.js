const Sequelize = require('sequelize')
const db = require('../db')

const PortfolioTracker = db.define('portfoliotracker', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  averageCostBasis: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = PortfolioTracker

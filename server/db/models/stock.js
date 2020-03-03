const Sequelize = require('sequelize')
const db = require('../db')

const Stock = db.define('stock', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Stock

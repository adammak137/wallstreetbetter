const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transaction', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  purchase: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = Transactions

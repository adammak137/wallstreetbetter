/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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
  },
  portfolio_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  stock_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  }
})

module.exports = Transactions

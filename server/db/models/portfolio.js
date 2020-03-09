/* eslint-disable camelcase */
const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 500000
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  }
})

module.exports = Portfolio

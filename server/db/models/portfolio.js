const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Portfolio

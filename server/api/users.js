/* eslint-disable camelcase */
const router = require('express').Router()
const {User, Portfolio} = require('../db/models')
const db = require('../db/db')
const axios = require('axios')
const tokenKey = process.env.IEX
module.exports = router

// users route can be used in the future to add features such as a user balance
// currently not in use but is left in for future purposes
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

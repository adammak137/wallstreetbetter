import React from 'react'
import PropTypes from 'prop-types'

function TransactionItem(props) {
  //portfolioname is lowercase because sql is not case sensitve
  const {
    quantity,
    amount,
    purchase,
    name,
    symbol,
    date,
    portfolioname
  } = props.transactionObject

  return (
    <tr>
      <td>{name}</td>
      <td>{symbol}</td>
      <td>{quantity}</td>
      <td>{amount}</td>
      <td>{purchase ? 'Buy' : 'Sell'}</td>
      <td>{date}</td>
      <td>{portfolioname}</td>
    </tr>
  )
}
TransactionItem.propTypes = {
  quantity: PropTypes.number,
  amount: PropTypes.number,
  name: PropTypes.string,
  symbol: PropTypes.string,
  date: PropTypes.string,
  portfolioname: PropTypes.string
}

export default TransactionItem

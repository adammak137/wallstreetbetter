import React from 'react'

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

export default TransactionItem

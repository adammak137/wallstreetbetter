import React from 'react'

function PortfolioStock(props) {
  let color = 'gray-text'
  if (props.latestPrice > props.previousClose) {
    color = 'green-text'
  } else if (props.latestPrice < props.previousClose) {
    color = 'red-text'
  }
  return (
    <tr>
      <td>{props.symbol}</td>
      <td>{props.name}</td>
      <td>{props.quantity}</td>
      <td className={`${color}`}>{`$${props.latestPrice}`}</td>
      <td className={`${color}`}>{`$${(
        props.latestPrice * props.quantity
      ).toFixed(2)}`}</td>
    </tr>
  )
}

export default PortfolioStock

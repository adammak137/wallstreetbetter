import React from 'react'
import PropTypes from 'prop-types'

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

PortfolioStock.propTypes = {
  latestPrice: PropTypes.number,
  previousClose: PropTypes.number
}

export default PortfolioStock

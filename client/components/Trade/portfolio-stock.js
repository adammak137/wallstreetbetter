import React from 'react'

function PortfolioStock(props) {
  return (
    <div className="row center-align">
      <div className="card-panel teal lighten-2 col s8 center-align">
        <h5>{props.quantity}</h5>
        <h5>{props.name}</h5>
        <h5>{props.symbol}</h5>
        <h5>{props.latestPrice}</h5>
      </div>
    </div>
  )
}

export default PortfolioStock

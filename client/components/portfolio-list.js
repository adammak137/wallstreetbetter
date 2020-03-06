import React from 'react'

const Portfoliolist = props => {
  return (
    <div className="row center-align">
      <div
        className="card-panel teal lighten-2 col s12 center-align"
        onClick={() => props.portfolioStocks(props.portfolioId)}
      >
        <h5>{props.name}</h5>
        <h5>{props.balance}</h5>
      </div>
    </div>
  )
}

export default Portfoliolist

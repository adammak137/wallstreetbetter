import React from 'react'
import {numberFormatter} from '../utility'
import PropTypes from 'prop-types'

const Portfoliolist = props => {
  return (
    <div className="row center-align">
      <div
        className="card-panel teal lighten-2 col s12 center-align"
        onClick={() => props.handleClick(props.portfolioId)}
      >
        <h5>{props.name}</h5>
        <h5>{`$${numberFormatter(props.balance)}`}</h5>
      </div>
    </div>
  )
}
Portfoliolist.propTypes = {
  portfolioId: PropTypes.number
}

export default Portfoliolist

import React from 'react'
import {connect} from 'react-redux'
import PortfolioStock from './portfolio-stock'
import PropTypes from 'prop-types'

class TradeHome extends React.Component {
  render() {
    return (
      <div className="section container">
        <div className="row">
          <div className="col s6 scroll">
            {this.props.stocks.map(stocks => {
              return (
                <PortfolioStock
                  key={stocks.symbol}
                  quantity={stocks.totalQuantity}
                  symbol={stocks.symbol}
                  latestPrice={stocks.latestPrice}
                  previousClose={stocks.previousClose}
                  name={stocks.name}
                />
              )
            })}
          </div>
          <div className="col s6">
            <div className="card-panel teal lighten-2 col s12 center-align ">
              <h1>Symbol</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentPortfolio: state.user.currentPortfolio,
    stocks: state.stocks
  }
}

const mapDispatch = dispatch => {
  return {}
}
TradeHome.propTypes = {
  currentPortfolio: PropTypes.number,
  stocks: PropTypes.array
}

export default connect(mapState, mapDispatch)(TradeHome)

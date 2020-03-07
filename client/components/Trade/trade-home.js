import React from 'react'
import {connect} from 'react-redux'
import PortfolioStock from './portfolio-stock'
import PropTypes from 'prop-types'
import SearchStock from './search-stock'
import TradeForm from './trade-form'

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
            <div className="row">
              <SearchStock />
            </div>
            <div className="row">
              <TradeForm />
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
    stocks: state.stocks.portfolioStocks
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

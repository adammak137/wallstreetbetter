import React from 'react'
import {connect} from 'react-redux'
import PortfolioStock from './portfolio-stock'
import PropTypes from 'prop-types'
import SearchStock from './search-stock'
import TradeForm from './trade-form'
import {searchStock, buySellStock} from '../../store/stock'
import {numberFormatter} from '../../utility'

class TradeHome extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0,
      calculatedTotal: 0,
      buyState: 'disabled',
      sellState: 'disabled'
    }
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  handleQuantity(event) {
    //setting the state of quantity and the calculated price
    const quantity = event.target.value
    this.setState({quantity})
    let stockPrice = this.props.stock.latestPrice * 100
    let calculatedTotal = stockPrice * event.target.value / 100
    this.setState({calculatedTotal})
    //determining if we need to disable the button for buy
    if (calculatedTotal !== 0 && this.props.balance / 100 > calculatedTotal) {
      this.setState({buyState: ''})
    } else {
      this.setState({buyState: 'disabled'})
    }
    //deterimine if we need to disable the button for sell
    let checkStock = this.props.stock.symbol.toUpperCase()
    if (this.props.stockMap.hasOwnProperty(checkStock)) {
      if (
        calculatedTotal !== 0 &&
        quantity <= parseInt(this.props.stockMap[checkStock], 10)
      ) {
        this.setState({sellState: ''})
      } else {
        this.setState({sellState: 'disabled'})
      }
    }
  }

  render() {
    return (
      <div className="section container">
        <div className="row">
          <div className="col s6 scroll">
            {this.props.stocks &&
              this.props.stocks.map(stocks => {
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
            <div className="row col s12 center-align card-panel">
              <div className="row">
                <div className="col s12">
                  <h5>{this.props.portfolioName}</h5>
                </div>
                <div className="col s6">
                  <h5>Portfolio Balance</h5>
                </div>
                <div className="col s6">
                  <h5>{`$${numberFormatter(this.props.balance)}`}</h5>
                </div>
              </div>
            </div>
            <div className="row">
              <SearchStock
                searchStock={this.props.searchStock}
                stock={this.props.stock}
              />
            </div>
            {this.props.stock.symbol && (
              <div className="row">
                <TradeForm
                  quantity={this.state.quantity}
                  calculatedTotal={this.state.calculatedTotal}
                  buyState={this.state.buyState}
                  sellState={this.state.sellState}
                  handleTransaction={this.props.handleTransaction}
                  handleQuantity={this.handleQuantity}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentPortfolio: state.user.currentPortfolio,
    stockMap: state.stocks.stockMap,
    stocks: state.stocks.portfolioStocks,
    stock: state.stocks.searchStock,
    portfolioName: state.user.currentPortfolio.name,
    balance: state.user.currentPortfolio.balance
  }
}

const mapDispatch = dispatch => {
  return {
    searchStock: evt => {
      evt.preventDefault()
      const symbol = evt.target.symbol.value
      dispatch(searchStock(symbol))
    },
    handleTransaction: (evt, transactionData) => {
      evt.preventDefault()
      console.log(evt.target.name, transactionData)
      transactionData.transactionType = evt.target.name
      dispatch(buySellStock(transactionData))
    }
  }
}

TradeHome.propTypes = {
  currentPortfolio: PropTypes.object,
  stocks: PropTypes.array,
  stock: PropTypes.object
}

export default connect(mapState, mapDispatch)(TradeHome)

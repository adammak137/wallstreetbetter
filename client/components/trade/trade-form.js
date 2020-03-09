import React from 'react'
import {connect} from 'react-redux'

function TradeForm(props) {
  const {companyName, latestPrice} = props.stock
  const quantity = props.quantity
  const calculatedTotal = props.calculatedTotal
  const handleQuantity = props.handleQuantity
  const buyState = props.buyState
  const sellState = props.sellState
  const handleTransaction = props.handleTransaction

  const transactionObject = {
    symbol: props.symbol.toLowerCase(),
    portfolioId: props.portfolioId,
    quantity: quantity
  }
  return (
    <div className="row col s12 center-align card-panel">
      <h5>{companyName}</h5>
      <h5>{`$${latestPrice}`}</h5>
      <form>
        <div className="row">
          <div className="input-field col s3 offset-s2 ">
            <label htmlFor="quantity" className="active">
              <small>Quantity</small>
            </label>
            <input
              name="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={handleQuantity}
            />
          </div>
          <div className="col s4 offset-s2 ">
            <h5>{`$${calculatedTotal}`}</h5>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col s6">
              <button
                className={`btn waves-effect waves-light btn-large ${sellState}`}
                type="submit"
                name="sell"
                onClick={evt => handleTransaction(evt, transactionObject)}
              >
                Sell
              </button>
            </div>
            <div className="col s6">
              <button
                className={`btn waves-effect waves-light btn-large ${buyState}`}
                type="submit"
                name="buy"
                onClick={evt => handleTransaction(evt, transactionObject)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    currentPortfolio: state.user.currentPortfolio,
    stock: state.stocks.searchStock,
    portfolioName: state.user.currentPortfolio.name,
    balance: state.user.currentPortfolio.balance,
    portfolioId: state.user.currentPortfolio.id,
    symbol: state.stocks.searchStock.symbol
  }
}

export default connect(mapState)(TradeForm)

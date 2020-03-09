import React from 'react'
import {connect} from 'react-redux'
import {getAllTransactions} from '../../store/transactions'
import TransactionItem from './transaction-item'
import PropTypes from 'prop-types'

class TransactionHome extends React.Component {
  componentDidMount() {
    this.props.getAllTransactions()
  }
  render() {
    return (
      <div className="section container">
        <div className="col s12 center-align">
          <table className="striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Buy/Sell</th>
                <th>Portfolio Name</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {this.props.transactions &&
                this.props.transactions.map(transaction => {
                  return (
                    <TransactionItem
                      key={transaction.id}
                      transactionObject={transaction}
                    />
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    getAllTransactions: () => {
      dispatch(getAllTransactions())
    }
  }
}

TransactionHome.propTypes = {
  transactions: PropTypes.array
}

export default connect(mapState, mapDispatch)(TransactionHome)

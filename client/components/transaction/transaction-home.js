import React from 'react'
import {connect} from 'react-redux'

class TransactionHome extends React.Component {
  render() {
    console.log('transaction home')
    return <div>hello world</div>
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect()(TransactionHome)

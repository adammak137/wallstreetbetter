import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {allPortfolios} from '../store/portfolio'

/**
 * COMPONENT
 */
// export const UserHome = props => {

class UserHome extends React.Component {
  componentDidMount() {
    this.props.allPortfolios()
  }
  render() {
    return (
      <div className="row">
        <div className="col s12" />
        <h3 className="center-align">All Portfolios</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}
const mapDispatch = dispatch => {
  return {
    allPortfolios: () => {
      dispatch(allPortfolios())
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

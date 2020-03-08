import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {allPortfolios} from '../store/portfolio'
import {portfolioStocks} from '../store/stock'
import PortfolioList from './portfolio-list'

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
      <div className="section container">
        <div className="row">
          <div className="col s12" />
          <h3 className="center-align">All Portfolios</h3>
        </div>
        {this.props.portfolios &&
          this.props.portfolios.map(element => {
            return (
              <div key={element.id}>
                <PortfolioList
                  name={element.name}
                  balance={element.balance}
                  portfolioId={element.id}
                  handleClick={this.props.portfolioStocks}
                />
              </div>
            )
          })}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    portfolios: state.portfolios
  }
}
const mapDispatch = dispatch => {
  return {
    allPortfolios: () => {
      dispatch(allPortfolios())
    },
    portfolioStocks: portfolioId => {
      dispatch(portfolioStocks(portfolioId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  portfolios: PropTypes.array
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, name}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <ul>
            <li>
              <a id="title">Wall Street Better</a>
            </li>
          </ul>
          <ul className="right">
            <li>
              {' '}
              <a>Welcome, {name}</a>
            </li>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <ul>
            <li>
              <a id="title">Wall Street Better</a>
            </li>
          </ul>
          <ul className="right">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    name: state.user.firstName
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

import React, {Component} from 'react'
import M from 'materialize-css'
import {connect} from 'react-redux'
import {createPortfolio} from '../store/portfolio'

//currently not handling minimum characters
class CreatePortfolio extends Component {
  constructor() {
    super()
    this.state = {
      portfolioName: ''
    }
    this.handleName = this.handleName.bind(this)
  }

  handleName(evt) {
    this.setState({portfolioName: evt.target.value})
  }

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log('Open Start')
      },
      onOpenEnd: () => {
        console.log('Open End')
      },
      onCloseStart: () => {
        console.log('Close Start')
      },
      onCloseEnd: () => {
        console.log('Close End')
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: '4%',
      endingTop: '10%'
    }
    M.Modal.init(this.Modal, options)
  }
  render() {
    return (
      <div>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal1"
        >
          Create Portfolio
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal
          }}
          id="modal1"
          className="modal"
        >
          <form onSubmit={evt => this.props.createPortfolio(evt)}>
            <div className="modal-content">
              <h4>Add a portfolio name</h4>
              <p>Your portfolio will start with a balance of $5000.00 </p>
              <div className="row">
                <div className="input-field col s6 offset-s3 center-align">
                  <label htmlFor="portfolioName">
                    <small>Enter a name here</small>
                  </label>
                  <input
                    name="portfolioName"
                    type="text"
                    onChange={this.handleName}
                    value={this.stateportfolioName}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <a className="modal-close waves-effect waves-red btn-flat">
                Cancel
              </a>
              <a
                onClick={evt =>
                  this.props.createPortfolio(evt, this.state.portfolioName)
                }
                className="modal-close waves-effect waves-green btn-flat"
              >
                Create
              </a>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createPortfolio: (evt, portfolioName) => {
      evt.preventDefault()
      dispatch(createPortfolio(portfolioName))
    }
  }
}

export default connect(null, mapDispatch)(CreatePortfolio)

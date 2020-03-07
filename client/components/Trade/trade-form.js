import React from 'react'

function TradeForm() {
  return (
    <div className="row col s12 center-align card-panel">
      <h5>Advanced Micro Devices</h5>
      <h5>$300.56</h5>
      <div className="row">
        <div className="col s6">
          <h5>Portfolio Balance</h5>
        </div>
        <div className="col s6">
          <h5>$300000</h5>
        </div>
      </div>
      <form>
        <div className="row">
          <div className="input-field col s3 offset-s2 ">
            <label htmlFor="quantity">
              <small>Quantity</small>
            </label>
            <input name="quantity" type="number" min="0" />
          </div>
          <div className="input-field col s4 offset-s2 ">
            <h5>$5000</h5>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col s6">
              <button
                className="btn waves-effect waves-light btn-large"
                type="submit"
                name="action"
              >
                Sell
              </button>
            </div>
            <div className="col s6">
              <button
                className="btn waves-effect waves-light btn-large"
                type="submit"
                name="action"
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
export default TradeForm

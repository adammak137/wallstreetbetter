import React from 'react'

function SearchStock(props) {
  return (
    <div className="row col s12 center-align card-panel">
      <h4>Search Stock</h4>
      <form onSubmit={evt => props.searchStock(evt)}>
        <div className="row">
          <div className="input-field col s6 offset-s3 center-align">
            <label htmlFor="symbol">
              <small>Enter a symbol here</small>
            </label>
            <input name="symbol" type="text" />
          </div>
        </div>
        <div>
          <div className="row">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Find Stock
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchStock

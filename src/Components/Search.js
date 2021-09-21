import React, { Component } from 'react'

export class Search extends Component {
  render() {
    return (
      <div>
        <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search">Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
      </div>
    )
  }
}

export default Search

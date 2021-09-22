import React, { Component } from 'react';
import SingleBook from './SingleBook';
import { Link } from 'react-router-dom';

export class Search extends Component {
  state = {
    query: '',
  };

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  render() {
    const { query } = this.state;
    const { books, changBookState } = this.props;

    const showingBooks =
      query === ''
        ? []
        : books.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
          );

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
                type="text"
                placeholder="Search by title or author"
              />
            </div>
          </div>
          
          <div className="search-books-results">
          {showingBooks.length !== 0 && (
            <div>
              <span>
                showing {showingBooks.length} results for query {query}
              </span>
            </div>
          )}
          {(showingBooks.length === 0 && query.length !== 0) && (
            <div>
              <span>
                There is no matching results for {query}
              </span>
            </div>
          )}
            <ol className="books-grid">
              {showingBooks.map((book) => (
                <SingleBook
                  key={book.id}
                  book={book}
                  changBookState={changBookState}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

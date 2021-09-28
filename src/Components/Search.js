import React, { Component } from 'react';
import SingleBook from './SingleBook';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

export class Search extends Component {
  // state = {
  //   query: '',
  //   books: [],
  //   searching: false,
  // };

  // componentDidMount() {
  //   BooksAPI.getAll().then((books) => {
  //     console.log('books returned: ', books);
  //     this.setState(() => ({
  //       books,
  //     }));
  //   });
  // }

  // search(query) {
  //   BooksAPI.search(query).then((books) => {
  //     if (books.error === 'empty query') {
  //       this.setState({
  //         books: [],
  //         searching: false,
  //       });
  //     } else {
  //       this.setState(() => ({
  //         books,
  //         searching: false,
  //       }));
  //     }
  //   });
  // }

  // updateQuery = (query) => {
  //   this.setState(
  //     () => ({
  //       query: query.trim(),
  //       searching: true,
  //     }),
  //     () => {
  //       setTimeout(() => {
  //         if (this.state.query === '') {
  //           this.setState({
  //             books: [],
  //             searching: false,
  //           });
  //         } else {
  //           this.search(this.state.query);
  //         }
  //       }, 500)
  //     }
  //   );
  // };

  componentDidMount(){
    this.props.clearSearchPage()
  }
  

  render() {
    // const { query, books } = this.state;
    const { changBookState, books, query, updateQuery, searching, mainBooks } = this.props;

    // const showingBooks =
    //   query === ''
    //     ? []
    //     : books

    const validatedBooks = books.map((searchedBook) => {
      const myBook = this.props.mainBooks.filter((myBook) => (myBook.id === searchedBook.id))[0]
      searchedBook.shelf = myBook ? myBook.shelf : "none"
      return searchedBook})

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                onChange={(event) => updateQuery(event.target.value)}
                type="text"
                placeholder="Search by title or author"
              />
            </div>
          </div>

          <div className="search-books-results">
            {books.length !== 0 && (
              <div>
                <span>
                  showing {books.length} results for query {query}
                </span>
              </div>
            )}
            {books.length === 0 && query.length !== 0 && searching === false && (
              <div>
                <span>There is no matching results for {query}</span>
              </div>
            )}
            <ol className="books-grid">
              {validatedBooks.map((book) => (
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

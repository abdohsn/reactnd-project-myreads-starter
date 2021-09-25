import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Components/Shelf';
import { Link, Route } from 'react-router-dom';
import Search from './Components/Search';
import { shelves } from './shelves.json';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    query: '',
    searchedBooks: [],
    searching: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log('books returned: ', books);
      this.setState(() => ({
        books,
      }));
    });
  }

  changBookState = (id, NewState) => {
    this.setState((currentState) => ({
      books: currentState.books.map((book) => {
        if (book.id === id) {
          book.shelf = NewState;
          BooksAPI.update(book, NewState);
          return book;
        }
        return book;
      }),
    }));
  };

  changSearchedBookState = (id, NewState) => {
    this.setState((currentState) => ({
      searchedBooks: currentState.searchedBooks.map((book) => {
        if (book.id === id) {
          book.shelf = NewState;
          BooksAPI.update(book, NewState);
          this.state.books.concat(book);
          return book;
        }
        return book;
      }),
    }));
  };

  search(query) {
    BooksAPI.search(query).then((searchedBooks) => {
      if (searchedBooks.error === 'empty query') {
        this.setState({
          searchedBooks: [],
          searching: false,
        });
      } else {
        this.setState(() => ({
          searchedBooks,
          searching: false,
        }));
      }
    });
  }

  updateQuery = (query) => {
    this.setState(
      () => ({
        query: query.trim(),
        searching: true,
      }),
      () => {
        setTimeout(() => {
          if (this.state.query === '') {
            this.setState({
              searchedBooks: [],
              searching: false,
            });
          } else {
            this.search(this.state.query);
          }
        }, 1000);
      }
    );
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <>
              <div>
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      {shelves
                        .filter((shelf) => shelf.shelfName !== 'none')
                        .map((shelf) => (
                          <Shelf
                            key={shelf.id}
                            changBookState={this.changBookState}
                            shelfDisplayName={shelf.shelfDisplayName}
                            shelfBooks={this.state.books.filter(
                              (book) => book.shelf === shelf.shelfName
                            )}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              books={this.state.searchedBooks}
              changBookState={this.changSearchedBookState}
              query={this.state.query}
              updateQuery={this.updateQuery}
              searching={this.state.searching}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

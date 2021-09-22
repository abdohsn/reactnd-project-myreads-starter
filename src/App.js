import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Components/Shelf';
import { Link, Route } from 'react-router-dom';
import Search from './Components/Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelfs: [
      { id: 1, bookStatus: 'wantToRead' },
      { id: 2, bookStatus: 'currentlyReading' },
      { id: 3, bookStatus: 'read' },
    ],
    showSearchPage: false,
    books: [],
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
                      {this.state.shelfs.map((shelf) => (
                        <Shelf
                          key={shelf.id}
                          changBookState={this.changBookState}
                          shelfName={shelf.bookStatus}
                          shelfBooks={this.state.books.filter(
                            (book) => book.shelf === shelf.bookStatus
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
              books={this.state.books}
              changBookState={this.changBookState}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;

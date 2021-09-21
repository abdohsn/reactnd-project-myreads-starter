import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Components/Shelf';

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

  render() {
    return (
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
                  shelfName={shelf.bookStatus}
                  shelfBooks={this.state.books.filter(
                    (book) => (book.shelf == shelf.bookStatus)
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp;

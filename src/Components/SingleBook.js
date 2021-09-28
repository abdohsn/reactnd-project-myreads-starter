import React, { Component } from 'react';
import { shelves } from '../shelves.json';
import Emoji from './Emoji';

export class SingleBook extends Component {
  render() {
    const { book, changBookState } = this.props;
    var Checkmark = '✔';
    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: book.imageLinks?.thumbnail ?
                `url("${book.imageLinks.thumbnail}")`
                  : undefined
              }}
            />
            <div className="book-shelf-changer">
              <select
                onChange={(event) =>
                  changBookState(book.id, event.target.value)
                }
                value={book.shelf}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                {/* <option value="none">None</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option> */}
                {shelves.map((shelf) => (
                  <option value={shelf.shelfName} key={shelf.shelfName}>
                    {shelf.shelfName === book.shelf && Checkmark}{' '}
                    {shelf.shelfDisplayName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
          <div className="book-authors">{book.shelf}</div>
          {/* <FontAwesomeIcon icon={faCheck} /> */}
          {/* <Emoji symbol="🐑" /> */}
        </div>
      </div>
    );
  }
}

export default SingleBook;

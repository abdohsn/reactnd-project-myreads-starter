import { bool } from 'prop-types';
import React, { Component } from 'react';
import BooksApp from '../App';

export class SingleBook extends Component {
  render() {
    const { book, changBookState } = this.props;        

    return (
      <div>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={(event) => changBookState(book.id, event.target.value)}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="none">None</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
          <div className="book-authors">{book.shelf}</div>
        </div>
      </div>
    );
  }
}

export default SingleBook;

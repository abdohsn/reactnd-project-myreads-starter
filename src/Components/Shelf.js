import React, { Component } from 'react';
import SingleBook from './SingleBook';

export class Shelf extends Component {
  render() {
    const { shelfBooks, shelfName, changBookState } = this.props;

    console.log('shlefbookss: ', shelfBooks);

    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfName}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <li>
                {shelfBooks.map((book) => (
                  <SingleBook key={book.id} book={book} changBookState={changBookState} />
                ))}
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelf;

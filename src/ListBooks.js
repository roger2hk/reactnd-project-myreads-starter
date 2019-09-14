import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";

class ListBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  bookshelfs = [
    {
      id: "currentlyReading",
      title: "Currently Reading",
      books: []
    },
    {
      id: "wantToRead",
      title: "Want to Reading",
      books: []
    },
    {
      id: "read",
      title: "Read",
      books: []
    }
  ];

  updateShelf = (bookId, shelf) => {
    const book = this.props.books.find(book => book.id === bookId);
    this.props.onUpdateShelf(book, shelf);
  };

  render() {
    const { books } = this.props;

    this.bookshelfs[0].books = books.filter(
      book => book.shelf === "currentlyReading"
    );
    this.bookshelfs[1].books = books.filter(
      book => book.shelf === "wantToRead"
    );
    this.bookshelfs[2].books = books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.bookshelfs && this.bookshelfs.map(bookshelf => (
              <div key={bookshelf.id} className="bookshelf">
                <h2 className="bookshelf-title">{bookshelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {bookshelf.books.map(book => (
                      <li key={book.id}>
                        <Book
                          id={book.id}
                          title={book.title}
                          authors={book.authors}
                          imageLinks={book.imageLinks}
                          shelf={book.shelf}
                          onUpdateShelf={this.updateShelf}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link className="open-search" to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

export default ListBooks;

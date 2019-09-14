import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";

class SearchBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  };

  state = {
    query: "",
    queryBooks: []
  };

  updateQuery = query => {
    this.setState(() => ({
      query: query.trim()
    }));

    this.searchBooks(this.state.query);
  };

  clearQuery = () => {
    this.updateQuery("");
  };

  searchBooks = query => {
    if (query) {
      BooksAPI.search(query).then(queryBooks => {
        if (queryBooks.error) {
          this.setState({ queryBooks: [] });
        } else {
          this.setState(() => ({
            queryBooks
          }));
        }
      });
    }
  };

  updateShelf = (bookId, shelf) => {
    const book = this.state.queryBooks.find(book => book.id === bookId);
    this.props.onUpdateShelf(book, shelf);
  };

  render() {
    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.queryBooks &&
              this.state.queryBooks.map(book => (
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
    );
  }
}

export default SearchBooks;

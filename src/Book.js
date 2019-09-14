import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    imageLinks: PropTypes.object.isRequired,
    shelf: PropTypes.string,
    onUpdateShelf: PropTypes.func.isRequired
  };

  onBookshelfChange = bookshelf => {
    this.props.onUpdateShelf(this.props.id, bookshelf);
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + this.props.imageLinks.thumbnail + ")"
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={event => this.onBookshelfChange(event.target.value)}
              value={this.props.shelf ? this.props.shelf : "none"}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    );
  }
}

export default Book;

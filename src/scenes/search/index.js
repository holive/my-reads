import React, { Component } from 'react'
import Result from './result'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends Component {

   state = { query: '' }

   updateQuery(query) {
      this.setState({ query })
      this.props.searchBooks(query)
   }

   render() {
      const { results } = this.props
      const { query } = this.state

      return (
         <div className="search-books">
            <div className="search-books-bar">
               <Link
                  onClick={() => this.updateQuery('')}
                  className="close-search"
                  to="/">Close
               </Link>

               <div className="search-books-input-wrapper">
                  <input
                     autoFocus="true"
                     type="text"
                     placeholder="Search by title or author"
                     value={query}
                     onChange={(e) => this.updateQuery(e.target.value)}
                  />
               </div>
            </div>

            <Result
               books={results}
               modifyBook={this.props.modifyBook}
               verifyShelf={this.props.verifyShelf}
            />
         </div>
      )
   }
}

Search.propTypes = {
	searchBooks: PropTypes.func.isRequired,
	modifyBook: PropTypes.func.isRequired,
   verifyShelf: PropTypes.func.isRequired,
   results: PropTypes.array.isRequired
}

export default Search
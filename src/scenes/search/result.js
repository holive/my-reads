import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import Book from '../../components/book'
import PropTypes from 'prop-types'

const result = (props) => {

	if (!props.books[0]) {
		return (
			<div className="search-books-results"></div>
		)
	}

	return (
		<div className="search-books-results">
			<ol className="books-grid">
				<CSSTransitionGroup
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>

					{
						props.books.map(book => (
							<Book
								modifyBook={props.modifyBook}
								infos={book}
								key={book.id}
								verifyShelf={props.verifyShelf}
								showRating={false}
							/>))
					}
				</CSSTransitionGroup>
			</ol>
		</div>
	)
}

result.propTypes = {
	books: PropTypes.array.isRequired,
	modifyBook: PropTypes.func.isRequired,
	verifyShelf: PropTypes.func.isRequired
}

export default result
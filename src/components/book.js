import React, { Component } from 'react'
import Select from 'react-select'
import Rating from './rating'
import 'react-select/dist/react-select.css'
import PropTypes from 'prop-types'

class Book extends Component {

	constructor(props) {
		super(props)
		this.modifyShelf = this.modifyShelf.bind(this)
		this.modifyRating = this.modifyRating.bind(this)
		this.selectHandleClick = this.selectHandleClick.bind(this)
	}

	modifyShelf(event) {
		const cloned = JSON.parse(JSON.stringify(this.props.infos))
		cloned.shelf = event.value
		this.props.modifyBook(cloned, 'shelf')
	}

	modifyRating(rating) {
		const cloned = JSON.parse(JSON.stringify(this.props.infos))
		cloned.myRating = parseInt(rating, 10)
		this.props.modifyBook(cloned, 'myRating')
	}

	selectHandleClick() {
		!this.props.showRating &&
			this.props.verifyShelf(this.props.infos)
	}

	render() {
		const {
			title = '',
			imageLinks = '',
			authors = [],
			shelf = 'none',
			id = '',
			myRating = 0
		} = this.props.infos
		
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>

						<div onClick={this.selectHandleClick} className="book-shelf-changer">
							<Select
								name="form-field-name"
								value={shelf}
								onChange={this.modifyShelf}
								options={[
									{ value: '', label: 'Move to...', disabled: true },
									{ value: 'currentlyReading', label: 'Currently Reading' },
									{ value: 'wantToRead', label: 'Want to Read' },
									{ value: 'read', label: 'Read' },
									{ value: 'none', label: 'None' },
								]}
							/>
						</div>
					</div>

					<div className="book-title">{title}</div>

					<div className="book-authors">
						{authors.map((a, i) => (i ? ', ' : '') + a)}
					</div>
					
					{shelf === 'read' && this.props.showRating ? 
						<Rating id={id} myRating={myRating} modifyRating={this.modifyRating} /> : ''}
				</div>
			</li>
		)
	}	
}

Book.propTypes = {
	infos: PropTypes.object.isRequired,
	modifyBook: PropTypes.func.isRequired,
	verifyShelf: PropTypes.func,
	showRating: PropTypes.bool
}

export default Book
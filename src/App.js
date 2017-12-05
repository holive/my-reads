import React, { Component } from 'react'
import Search from './scenes/search'
import Home from './scenes/home'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
import './css/App.css'

class App extends Component {

	constructor(props) {
		super(props)
		this.state = { books: [], search: [] }
		this.modifyBook = this.modifyBook.bind(this)
		this.searchBooks = this.searchBooks.bind(this)
		this.verifyShelf = this.verifyShelf.bind(this)
	}

	componentDidMount() {
		//look first on localStorage to avoid extra request to the API
		if (window.localStorage.getItem('booksList')) {
			const books = JSON.parse(window.localStorage.getItem('booksList'))
			this.setState({ books })
		} else {
			BooksAPI.getAll().then(books => this.updateState(books))
		}
	}

	modifyBook(newBook, key) {
		let alreadyOnShelf = false

		const books = this.state.books.map(b => {
			if (b.id === newBook.id) {
				b[key] = newBook[key]
				alreadyOnShelf = true
			}
			return b
		})

		if (!alreadyOnShelf) books.push(newBook)

		BooksAPI.update(newBook, newBook.shelf)
		this.updateState(books)
	}

	updateState(books) {
		window.localStorage.setItem('booksList', JSON.stringify(books))
		this.setState({ books })
	}

	searchBooks(query) {
		BooksAPI.search(query).then(search => this.setState({ search }))
	}

	verifyShelf(book) {
		const match = this.state.books.find(b => b.id === book.id) || 'none'
		book.shelf = match.shelf
		this.setState({ search: this.state.search })
		return match
	}

	render() {
		const { books = [], search = [] } = this.state

		return (
			<BrowserRouter>
				<div className="app">
					<Route exact path="/" render={() => (
						<Home
							books={books}
							modifyBook={this.modifyBook}
						/>
					)} />

					<Route path="/search" render={() => (
						<Search
							searchBooks={this.searchBooks}
							modifyBook={this.modifyBook}
							verifyShelf={this.verifyShelf}
							results={search}
						/>
					)} />
				</div>
			</BrowserRouter>
		)
	}
}

export default App
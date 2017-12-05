import React from 'react'
import Bookshelf from './bookshelf'
import SearchButton from '../../components/SearchButton'
import PropTypes from 'prop-types'

const home = (props) => {

   const { modifyBook, books } = props
   
   const reading = books.filter(b => b.shelf === 'currentlyReading')
   const toRead = books.filter(b => b.shelf === 'wantToRead')
   const read = books.filter(b => b.shelf === 'read')

   return (
      <div className="list-books">
         <div className="list-books-title">
            <h1>MyReads</h1>
         </div>
         
         <div className="list-books-content">
            <Bookshelf modifyBook={modifyBook} books={reading} title="Currently Reading" />
            <Bookshelf modifyBook={modifyBook} books={toRead} title="Want to Read" />
            <Bookshelf modifyBook={modifyBook} books={read} title="Read" />
         </div>

         <SearchButton />
      </div>
   )
}

home.propTypes = {
	books: PropTypes.array.isRequired,
	modifyBook: PropTypes.func.isRequired,
}

export default home
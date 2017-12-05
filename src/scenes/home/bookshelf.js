import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import Book from '../../components/book'
import PropTypes from 'prop-types'

const bookshelf = (props) => {

   return (
      <div className="bookshelf">
         <h2 className="bookshelf-title">{props.title}</h2>

         <div className="bookshelf-books">
            <ol className="books-grid">
               <CSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>

                  {props.books.map(book => 
                     <Book modifyBook={props.modifyBook} infos={book} key={book.id} showRating={true}/>)
                  }
               </CSSTransitionGroup>
            </ol>
         </div>
      </div>
   )
}

bookshelf.propTypes = {
	books: PropTypes.array,
	modifyBook: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired
}

export default bookshelf
jest.mock('../services/BooksAPI')

import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../App'
import * as BooksAPI from '../services/BooksAPI'

const books = [
   {
      id: '1',
      title: 'Book 1',
      shelf: 'read'
   },
   {
      id: '2',
      title: 'Book 2',
      shelf: 'wantToRead'
   },
   {
      id: '3',
      title: 'Book 3',
      shelf: 'currentlyReading'
   }
]

global.localStorage.getItem = jest.fn().mockImplementation(() => JSON.stringify(books))

const wrapper = mount(
   <MemoryRouter initialEntries={['/']}>
      <App />
   </MemoryRouter>
)

describe('<App />', () => {
   it('shallow renders without crashing', () => {
      expect(shallow(<App />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
   })

   it('has a <Home />', () => {
      expect(wrapper.find('home').length).toBe(1)
   })

   it('has a <Search />', () => {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/search']}>
            <App />
         </MemoryRouter>
      )

      expect(wrapper.find('Search').length).toBe(1)
   })

   it('loads the books on mount and update the state, if localStorage exists', () => {
      expect(wrapper.find(App).instance().state.books.length).toBe(3)
   })

   describe('API calls', () => {
      global.localStorage.getItem = jest.fn()

      BooksAPI.getAll = jest.fn().mockImplementation(() => {
         return new Promise((resolve, reject) => resolve(books))
      })

      BooksAPI.update = jest.fn()

      BooksAPI.search = jest.fn().mockImplementation(() => {
         return new Promise((resolve, reject) => resolve(books))
      })

      const wrapper = mount(
         <MemoryRouter initialEntries={['/']}>
            <App />
         </MemoryRouter>
      )

      it('calls getAll)', () => {
         expect(BooksAPI.getAll).toHaveBeenCalled()
      })

      it('calls update', () => {
         wrapper.find(App).instance().modifyBook(books[1], 'shelf')
         expect(BooksAPI.update).toHaveBeenCalled()
      })

      it('calls update and verify if the book is on shelf', () => {
         wrapper.find(App).instance().state.books = books
         wrapper.find(App).instance().modifyBook(books[0], 'shelf')
         expect(BooksAPI.update).toHaveBeenCalled()
      })

      it('calls search', () => {
         wrapper.find(App).instance().searchBooks('')
         expect(BooksAPI.search).toHaveBeenCalled()
      })
   })

   describe('methods', () => {
      it('calls verifyShelf and test if match or not with existing book on state', () => {
         const book = { id: '4', title: 'Book 1', shelf: 'read' }
         expect(wrapper.find(App).instance().verifyShelf(book)).toBe('none')
         expect(wrapper.find(App).instance().verifyShelf(books[0])).not.toBe('none')
      })
   })
})
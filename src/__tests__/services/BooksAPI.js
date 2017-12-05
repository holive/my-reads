import React from 'react'
import { shallow, mount } from 'enzyme'
import * as BooksAPI from '../../services/BooksAPI'

describe('test calls to API', () => {

   it('verifies if the token exists', () => {
      expect(BooksAPI.getToken()).toBeDefined()
      expect(BooksAPI.getToken('o43lq5mi')).toEqual('o43lq5mi')
   })

   it('calls get', () => {
      return BooksAPI.get('nggnmAEACAAJ')
         .then(data => {
            expect(data).toBeDefined()
            expect(data.id).toEqual('nggnmAEACAAJ')
         })
   })

   it('calls getAll', () => {
      return BooksAPI.getAll()
         .then(data => {
            expect(data[0]['id']).toBeDefined()
         })
   })

   it('calls update', () => {
      const book = {id:'nggnmAEACAAJ'}

      return BooksAPI.update(book, 'read')
         .then(data => {
            const match = data.read.find(b => b === book.id)
            expect(match).toEqual(book.id)
         })
   })

   it('calls search', () => {
      return BooksAPI.search('a')
         .then(data => {
            expect(data[0]['id']).toBeDefined()
         })
   })
})
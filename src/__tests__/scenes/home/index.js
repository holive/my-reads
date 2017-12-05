import React from 'react'
import { shallow, mount } from 'enzyme'
import Home from '../../../scenes/home'
import { MemoryRouter } from 'react-router-dom'

const props = {
   books: [
      {shelf: 'currentlyReading', id: '1'}, 
      {shelf: 'wantToRead', id: '2'},
      {shelf: 'read', id: '3'}      
   ],
   modifyBook: jest.fn()
}

const wrapper = mount(<MemoryRouter><Home  {...props} /></MemoryRouter>)

describe('<Home />', () => {
   it('shallow renders without crashing', () => {
      expect(shallow(<Home {...props} />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
   })

   it('has tree Bookshelf', () => {
      expect(wrapper.find('bookshelf').length).toBe(3)
   })

   it('has a SearchButton', () => {
      expect(wrapper.find('SearchButton').length).toBe(1)
   })
})
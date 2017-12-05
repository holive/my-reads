import React from 'react'
import { shallow, mount } from 'enzyme'
import Bookshelf from '../../../scenes/home/bookshelf'

const props = {
   modifyBook: jest.fn(),
   books: [{
      id: 'asdf',
      title: 'The book'
   }],
   title: 'Read'
}

const wrapper = mount(<Bookshelf {...props} />)

describe('<Bookshelf />', () => {
   it('shallow renders without crashing', () => {
      expect(shallow(<Bookshelf {...props} />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
   })

   it('has a title', () => {
      expect(wrapper.find('.bookshelf-title').text()).not.toBe('')
   })

   it('has a Book', () => {
      expect(wrapper.find('Book').length).toBe(1)
   })
})
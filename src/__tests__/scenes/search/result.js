import React from 'react'
import { shallow, mount } from 'enzyme'
import Result from '../../../scenes/search/result'

const props = {
	books: [{shelf: 'currentlyReading', id: '1'}],
	modifyBook: jest.fn(),
	verifyShelf: jest.fn()
}

const wrapper = mount(<Result {...props} />)

describe('<Result />', () => {
	it('shallow renders without crashing', () => {
      expect(shallow(<Result {...props} />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
	})
	
	it('returns an empty div if it has no book', () => {
		const props = {
			books: [],
			modifyBook: jest.fn(),
			verifyShelf: jest.fn()
		}
		
		const wrapper = mount(<Result {...props} />)
      expect(wrapper.find('.search-books-results').text()).toBe('')
	})
	
	it('returns an div if it has book', () => {
      expect(wrapper.find('.search-books-results').text()).not.toBe('')
	})
	
	it('has a Book', () => {
		expect(wrapper.find('Book').length).toBe(1)
	})
})
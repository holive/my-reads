import React from 'react'
import { shallow, mount } from 'enzyme'
import Search from '../../../scenes/search'
import { MemoryRouter } from 'react-router-dom'

const props = {
   searchBooks: jest.fn(),
   modifyBook: jest.fn(),
   verifyShelf: jest.fn(),
   results: [{ shelf: 'currentlyReading', id: '1' }]
}

const wrapper = mount(<MemoryRouter><Search {...props} /></MemoryRouter>)

describe('<Book />', () => {
   it('shallow renders without crashing', () => {
      expect(shallow(<Search {...props} />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
   })

   it('has a Link', () => {
      expect(wrapper.find('Link').length).toBe(1)
   })

   it('has a input', () => {
      expect(wrapper.find('input[type="text"]').length).toBe(1)
   })

   it('has a <Result />', () => {
      expect(wrapper.find('result').length).toBe(1)
   })

   it('calls updateQuery on Link click', () => {
      wrapper.find('Link').simulate('click')
      expect(wrapper.find(Search).props().searchBooks).toHaveBeenCalled()
   })

   it('calls updateQuery on input change', () => {
      wrapper.find('input[type="text"]').simulate('change')
      expect(wrapper.find(Search).props().searchBooks).toHaveBeenCalled()
   })
})
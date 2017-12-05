import React from 'react'
import { shallow, mount } from 'enzyme'
import Book from '../../components/book'
import Rating from '../../components/rating'

const props = {
   modifyBook: jest.fn(),
   infos: { shelf: 'read', authors: ['Hugo', 'Filho'] },
   verifyShelf: jest.fn(),
   showRating: true
}

const wrapper = mount(<Book  {...props} />)

describe('<Book />', () => {
   it('shallow renders without crashing', () => {
      expect(shallow(<Book {...props} />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
   })

   describe('has some elemnts', () => {
      it('has a image div', () => {
         expect(wrapper.find('.book-cover').length).toBe(1)
      })

      it('has a select', () => {
         expect(wrapper.find('Select').length).toBe(1)
      })

      it('has a title', () => {
         expect(wrapper.find('.book-title').length).toBe(1)
      })

      it('has authors div not empty', () => {
         expect(wrapper.find('.book-authors').text()).not.toBe('')
      })

      it('shows <Rating /> if shelf === read', () => {
         expect(wrapper.find(Rating).length).toBe(1)
      })
   })

   describe('test component methods', () => {
      const props = {
         modifyBook: jest.fn(),
         infos: { shelf: 'none' },
         verifyShelf: jest.fn()
      }
      const wrapper = mount(<Book  {...props} />)

      it('calls modifyBook on modifyShelf()', () => {
         const event = { value: 'read'}
         wrapper.instance().modifyShelf(event)
         expect(wrapper.props().modifyBook).toHaveBeenCalled()
      })

      it('calls modifyBook on modifyRating()', () => {
         const rating = '0'
         wrapper.instance().modifyRating(rating)
         expect(wrapper.props().modifyBook).toHaveBeenCalled()
      })

      it('calls verifyShelf on selectHandleClick()', () => {
         wrapper.instance().selectHandleClick()
         expect(wrapper.props().verifyShelf).toHaveBeenCalled()
      })
   })

   it('calls verifyShelf when click on select element wrapper', () => {
      const props = {
         modifyBook: jest.fn(),
         infos: { shelf: 'none' },
         verifyShelf: jest.fn()
      }
      const wrapper = mount(<Book {...props} />)   

      wrapper.find('.book-shelf-changer').simulate('click')
      expect(wrapper.props().verifyShelf).toHaveBeenCalled()
   })

   it("calls modifyBook on react-select onChange event", () => {
      const select = wrapper.find('Select')
      select.props().onChange("some value")
      expect(wrapper.props().modifyBook).toHaveBeenCalledTimes(1)
   })

   it("calls modifyBook when modifyRating is called", () => {
      const rating = wrapper.find(Rating)
      rating.modifyRating = jest.fn()
      rating.modifyRating()
      expect(wrapper.props().modifyBook).toHaveBeenCalledTimes(1)
   })
})

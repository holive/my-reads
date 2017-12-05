import React from 'react'
import { shallow, mount } from 'enzyme'
import Rating from '../../components/Rating'

const props = {
   id: 'xpto',
   myRating: 3,
   modifyRating: jest.fn()
}

const wrapper = mount(<Rating  {...props} />)

describe('<Rating />', () => {
   it('shallow renders without crashing', () => {
      expect(shallow(<Rating {...props} />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
   })

   it('has a form', () => {
      expect(wrapper.find('form').length).toBe(1)
   })

   it('has five inputs and five labels', () => {
      expect(wrapper.find('input').length).toBe(5)
      expect(wrapper.find('label').length).toBe(5)
   })

   it('call handleClick when click on label', () => {
      wrapper.find('label.star-1').simulate('click')
      expect(wrapper.props().modifyRating).toHaveBeenCalled()
   })

   it('checks the correct input according to the value of myRating', () => {
      expect(wrapper.find('input.star-3').prop('defaultChecked')).toBe(true)
   })
})


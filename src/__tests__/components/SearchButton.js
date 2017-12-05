import React from 'react'
import { shallow, mount } from 'enzyme'
import SearchButton from '../../components/SearchButton'
import { MemoryRouter } from 'react-router-dom'

const wrapper = mount(<MemoryRouter><SearchButton /></MemoryRouter>)

describe('<SearchButton />', () => {
   it('shallow renders without crashing', () => {
      expect(shallow(<SearchButton />))
   })

   it('mounts without crashing', () => {
      expect(wrapper)
   })

   it('includes link to search page', () => {
      expect(wrapper.find('a[href="/search"]').length).toBe(1);
   })
})

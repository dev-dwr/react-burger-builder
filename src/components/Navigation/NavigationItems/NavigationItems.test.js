import React from 'react'

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

//connecting enzyme
configure({adapter: new Adapter()})

//First Element you will see in console as a output
//Second element is oure test function there we are going to describe oure test
// it() allows us to write one individual test, it takes two arguments, first is a string it describe what will apprear in a console
describe('<NavigationItems/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems/>)
    })
    it('should render two <NavigationItmes/> items if we are not authenticated',() =>{
        
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('should render 3 <NavigationItem/> if we are authenticated',()=>{
       wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should show that we have LOGOUT link if we are authenticated', () =>{
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.contains(<NavigationItem link = "/logout">Logout</NavigationItem>)).toEqual(true)
    })

})
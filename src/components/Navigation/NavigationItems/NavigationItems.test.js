import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

let wrapper;

beforeEach(() => {
    wrapper = shallow(<NavigationItems/>);
})

describe('<NavigationItems/>', () => {
    it('should render two <NavigationItem/> if not authenticated' , () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
});

describe('<NavigationItems/>', () => {
    it('should render three <NavigationItem/> if authenticated' , () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exect logout' , () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})
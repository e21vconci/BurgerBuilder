// Eseguire test isolati
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure( { adapter: new Adapter() } );

describe( '<NavigationItems />', () => {
    let wrapper;

    // impostiamo il componente da esaminare
    beforeEach( () => {
        wrapper = shallow( <NavigationItems /> );
    } );

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        // controlliamo se il wrapper contiene un certo elemento
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        // passiamo la props isAuthenticated
        wrapper.setProps({isAuthenticated: true});
        // controlliamo se il wrapper contiene un certo elemento
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        // passiamo la props isAuthenticated
        wrapper.setProps({isAuthenticated: true});
        // controlliamo se il wrapper contiene il link per Logout
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});
import React from 'react'
import { mount, render, shallow } from 'enzyme'
import { expect } from 'chai';//chai expect is essential
import { ComponentTestSubject, Fixture, User, Button } from './../components-to-learn-testing';


it('renders without crashing', () => {
    const div = document.createElement('div');
    shallow(<ComponentTestSubject />);
});
it('testing enzyme', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper).to.contain(<User index={1} />);
});

it('another', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('SecondButton').dive().find('button')).to.have.lengthOf(1);
});
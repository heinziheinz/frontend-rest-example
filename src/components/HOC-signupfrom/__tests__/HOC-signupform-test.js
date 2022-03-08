import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Component from '../HOC-signupfrom';


describe('<SignupComponent', () => {
    it('HOC-fusion did mount', () => {
        // mount(<App />);
        const wrapper = mount(shallow(<Component />).get(0));
        console.log(wrapper);
    });

    it('clickevent signupform', () => {
        // let onFilter = sinon.stub();
        // const wrapper = mount(shallow(<Component onFilter={onFilter} />).get(0));
        // //that`s how I get the input field
        // const input = wrapper.find('input').at(1).simulate('change', { target: { value: 'superman' } });
        // expect(onFilter).to.have.property('callCount', 1);

    });
    it('another', () => {
        const wrapper = shallow(<Component />);
        console.log(wrapper);
        expect(wrapper.find('Enhanced').dive().find('div')).to.have.lengthOf(1);
    });
});
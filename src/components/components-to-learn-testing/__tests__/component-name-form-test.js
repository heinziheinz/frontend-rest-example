import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { NameForm, NestedFormToTest } from './../components-to-learn-testing';
describe('<NameForm', () => {
    it(
        'Component did render',
        () => {
            var event = { preventDefault: function () { } };

            var spy = sinon.spy();//?
            var mock = sinon.mock(event);//?
            const wrapper = shallow(<NameForm />);
            wrapper.find('form').simulate('submit', event);
            console.log(wrapper.instance().state.value);
            expect(wrapper.instance().state.value).to.equal('submitted');
        }
    );
});
describe('<NestedFormToTest/>', () => {
    console.log('hallo form');
    let wrapper = shallow(<NestedFormToTest />);
    wrapper.find('input').first().simulate('change', { target: { value: 'iron man' } });
});
//TODO http://derpturkey.com/trigger-sub-component-event-with-enzyme/
//TODO weiter: herausfinden wie man deep nested events triggert
// https://sinonjs.org/releases/v7.5.0/mocks/
// https://www.chaijs.com/api/bdd/
// https://airbnb.io/enzyme/docs/api/ShallowWrapper/simulate.html
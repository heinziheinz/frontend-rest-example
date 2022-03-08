import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { NameForm } from './../components-to-learn-testing';

describe('<Stumpomponent', () => {
    it('stump test', () => {
        const stub = () => { }
        const wrapper = sinon.stub(NameForm.prototype, 'componentDidMount');
        shallow(<NameForm myStump={wrapper(stub)} />)
        // shallow(<NameForm myStump={wrapper(stub)} />)
        expect(NameForm.prototype.componentDidMount).to.have.property('callCount', 2);
        NameForm.prototype.componentDidMount.restore();
    });
    it('check', () => {
        const event = { preventDefault: () => { } };
        // var event = { preventDefault: function () { } };
        const wrapper = shallow(<NameForm />);
        wrapper.find('form').simulate('submit', event);
        expect(wrapper.instance().state.value).to.equal('submitted');

    });
    it('input', () => {
        sinon.spy(NameForm.prototype, 'componentDidMount');
        const wrapper = shallow(<NameForm />);
        wrapper.find('input').at(0).simulate('change', { target: { value: 'superman' } });
        wrapper.find('input').at(1).simulate('change', { target: { value: 'faced' } });
        expect(NameForm.prototype.componentDidMount).to.have.property('callCount', 1);
        expect(wrapper.instance().state.value).to.equal('superman');
        expect(wrapper.instance().state.shit).to.equal('faced');
    });
});
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import LoginFrom from './../HOC-loginform';
import WrappedComponent from './../../loginform-temporary';
describe('LoginFrom', () => {
    it('LoginForm did render', () => {
        // let toggle = sinon.fake();
        var toggle = () => { };
        //mit shallow(shallow()) kann man tiefer in die HOC tauchen!!
        const firstWrapper = mount(shallow(<LoginFrom toggle={toggle} />).get(0));
        const wrapper = mount(shallow(shallow(<LoginFrom toggle={toggle} />).get(0)).get(0));
        console.log(wrapper);
        firstWrapper.find('input').at(0).simulate('click', toggle);
        //TODO click funktioniert, der upper toggle fehlt aber.. 
        // shallow(<LoginFrom.this.Wrapper.ajaxQuerrie />);
        console.log(wrapper.instance().state.collapse);
        console.log(wrapper.props());
        console.log(firstWrapper.props());
        // expect(wrapper.props().includedProp).to.equal('Success!');
    });
});
// https://medium.com/@AndreCalvo/react-component-testing-mocking-method-calls-components-and-time-d780d45e4cd5

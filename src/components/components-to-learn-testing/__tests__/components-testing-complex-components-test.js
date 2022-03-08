import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { MyClass } from '../components-to-learn-testing';
// https://www.chaijs.com/api/bdd/
// https://stackoverflow.com/questions/39106824/enzyme-call-method
describe('<MyClass  />', () => {
    //setting props
    it('testing complex component', () => {
        const wrapper = mount(<MyClass bar="baz" pass="pass" />);
        expect(wrapper.props().pass).to.equal('pass');
    });
    it('simulates click events', () => {
        //hier muss auch in der eigentlichen Componente eingegriffen werden
        //und der spy übergeben werden
        // <button onClick={this.props.onButtonClick}>Press me</button>
        const onButtonClick = sinon.spy();
        const wrapper = mount((
            <MyClass onButtonClick={onButtonClick} />
        ));
        wrapper.find('button').simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
    });
    it('calls componentDidMount', () => {
        //testing component did mount
        sinon.spy(MyClass.prototype, 'componentDidMount');
        const wrapper = mount(<MyClass />);
        expect(MyClass.prototype.componentDidMount).to.have.property('callCount', 1);
        MyClass.prototype.componentDidMount.restore();
    });
    it('calls submit', () => {
        //testing component did mount
        const wrapper = shallow(<MyClass />);
        //so kann man eine methode auslösen
        const instance = wrapper.instance();
        const value = instance.submit();
        console.log(value);
        console.log(wrapper);
        console.log(instance);
        expect(instance).to.be.instanceOf(MyClass);
    });
    it('calls submit and check state', () => {
        const wrapper = shallow(<MyClass />);
        //accessing the state
        const instance = wrapper.instance().state.mySweet;
        wrapper.instance().submit();
        expect(wrapper.instance().state.mySweet).to.equal('mySweet');
    });
});
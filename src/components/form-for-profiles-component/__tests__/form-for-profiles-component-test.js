import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './../form-for-profiles-component';
import { expect } from 'chai';//TODO wichtig, chai muss so inportiert werden.

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('shallow renders without crashing', () => {
    shallow(<App />);
});

it('shim check', () => {
    var keys = require('object-keys');
    var assert = require('assert');
    var obj = {
        a: true,
        b: true,
        c: true
    };

    delete Object.keys;
    var shimmedKeys = keys.shim();
    assert.equal(shimmedKeys, keys);
    assert.deepEqual(Object.keys(obj), keys(obj));

});

it('test jest enzyme', () => {


    class Fixture extends React.Component {
        render() {
            return (
                <div>
                    <input id='checked' defaultChecked />
                    <input id='not' defaultChecked={false} />
                </div>
            )
        }
    }

    const wrapper = mount(<Fixture />) // mount/render/shallow when applicable

    expect(wrapper.find('#checked')).to.be.checked();
    expect(wrapper.find('#not')).to.not.be.checked();
});

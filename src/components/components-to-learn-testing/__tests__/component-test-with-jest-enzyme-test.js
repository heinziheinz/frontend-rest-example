import React from 'react';
import { shallow, mount } from 'enzyme';
import { Multi } from './../components-to-learn-testing';

//hier wird jest-enzyme verwendet, expect ist hier global
//und die matchers sind etwas anders
it('testing jest enzyme', () => {
    debugger;
    const wrapper = mount(<Multi />); // mount/render/shallow when applicable
    expect(wrapper.find('.foo')).toHaveClassName('foo');
});
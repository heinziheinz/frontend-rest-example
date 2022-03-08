import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Form from './../form-for-profiles-component';
//https://github.com/producthunt/chai-enzyme#installation
// https://airbnb.io/enzyme/

it('form refactor validation', () => {
    shallow(<Form />);
});

it('Should capture firstname correctly onChange', function () {
    const form = mount(<Form />);
});
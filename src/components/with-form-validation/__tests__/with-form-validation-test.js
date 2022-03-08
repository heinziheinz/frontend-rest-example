import React from 'react';
import { mount } from 'enzyme';
import App from './../with-form-validation';

it('component did mount', () => {
    mount(<App />);
});
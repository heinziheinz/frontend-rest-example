import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import App from './../form-temporary';


it('shallow renders without crashing', () => {
    shallow(<App />);
});
it('mounting without crashing', () => {
    mount(<App />);
});
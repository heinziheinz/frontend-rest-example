import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Component from './../components-to-learn-testing';
import { Button } from './../components-to-learn-testing';
//hier ist expect die globale Variabel von jest


describe('check', () => {
    it('sum of numbers', () => {
        // expect(Component(1, 2)).toEqual(3);//this expect is jest
    });
    it('simulates click events', () => {
        const onButtonClick = sinon.spy();
        const wrapper = mount(<Button onButtonClick={onButtonClick} />);
        wrapper.find('button').simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
    });
});
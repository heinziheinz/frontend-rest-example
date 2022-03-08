import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { ItemFilter, TextInput, FormGroup } from './../components-to-learn-testing';

describe('<ItemFilter/>', () => {
    it('should trigger filter when query changes', () => {
        // stub the callback from onFilter
        let onFilter = sinon.stub();

        // generate a fully render wrapper with jsdom
        let wrapper = mount(<ItemFilter onFilter={onFilter} />);

        // find the TextInput, and since it is an Input
        // directly perform the simulate against it
        console.log(wrapper.find('form').first());
        wrapper.find(TextInput).at(0).simulate('change', { target: { value: 'iron man' } });
        wrapper.find(TextInput).at(1).simulate('change', { target: { value: 'superman' } });

        // assert that onFilter was called with our 
        // expected arguments: 'query' and 'marvel'
        expect(onFilter.getCall(0).args).to.deep.equal(['query', 'iron man']);
        expect(onFilter.getCall(1).args).to.deep.equal(['query', 'superman']);
    });
});
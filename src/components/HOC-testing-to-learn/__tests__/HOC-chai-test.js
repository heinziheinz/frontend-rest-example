import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect, assert } from 'chai';
import sinonStubPromise from 'sinon-stub-promise';
import sinon from 'sinon'
import MyComponent, { DisplaySearchResults } from './../display-search-results';
sinonStubPromise(sinon);


describe('stub for fetch', () => {

    it('stubing complete fetch', () => {
        let stubedFetch = sinon.stub(window, 'fetch');

        window.fetch.returns(Promise.resolve(mockApiResponse()));

        function mockApiResponse(body = {}) {
            return new window.Response(JSON.stringify(body), {
                status: 200,
                headers: { 'Content-type': 'application/json' }
            });
        }
        const wrapper = shallow(<MyComponent />);
        wrapper.instance().handlerChanger();
        expect(window.fetch).to.have.property('callCount', 1);
        // console(window.fetch);
        // expect(window.fetch).to.have.property("ambient-supplementerapi/password/create");
    });

});
// https://stackoverflow.com/questions/45946284/mock-http-fetch-in-sinon
import React from 'react';
import { shallow, mount } from 'enzyme';
import MyComponent, { DisplaySearchResults } from './../display-search-results';
import { APIRequest, MyFetch } from './../checking';
const myGlobal = global.fetch;
describe('ckecin', () => {
    xit('anonymos spy', done => {
        global.fetch = require('jest-fetch-mock');
        beforeEach(() => {
            global.fetch.resetMocks();
        });
        afterEach(() => {
            global.fetch = myGlobal;
        });
        // jest.mock(global.fetch);
        const wrapper = shallow(<MyComponent />);
        console.log(wrapper.instance().state);
        fetch.mockResponseOnce(JSON.stringify([{ message: 'first and allways' }]), { status: 200 });
        // fetch.mockReject(new Error('fake error message'));
        const onResponse = jest.fn();
        const onError = jest.fn();
        const my = wrapper.instance().handlerChanger();
        process.nextTick(() => { // 6
            expect(wrapper.state()).toEqual({
                error: null,
                isLoaded: true,
                message: 'OK'
            });
            expect(fetch.mock.calls.length).toEqual(1);
            console.log(fetch.mock.calls[0][0]);
            expect(fetch.mock.calls[0][0]).toEqual(process.env.REACT_APP_URL + 'api/password/create');
            done(); // 8
        });
    });
    it('anonymos spy', () => {
        global.fetch = require('jest-fetch-mock');
        beforeEach(() => {
            global.fetch.resetMocks();
        });
        afterEach(() => {
            global.fetch = myGlobal;
        });
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
        console.log('suckoo');
        //assert on the response
        APIRequest('google').then(res => {
            console.log(res);
            expect(res.data).toEqual('12345');
            //assert on the times called and arguments given to fetch
            expect(fetch.mock.calls.length).toEqual(1);
            expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
            console.log(fetch.mock);
        })
    });
    xit('anonymos spy', () => {
        global.fetch = require('jest-fetch-mock');
        beforeEach(() => {
            global.fetch.resetMocks();
        });
        afterEach(() => {
            global.fetch = myGlobal;
        });
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))

        //assert on the response
        MyFetch('google').then(res => {
            expect(res.data).toEqual('12345');
            //assert on the times called and arguments given to fetch
            expect(fetch.mock.calls.length).toEqual(1);
            // expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
            console.log(fetch.mock.calls[0][0]);
        }).catch(err => {
            console.log(err);
        });
    });
});
import React from 'react';
import { shallow, mount } from 'enzyme';
import MyComponent, { DisplaySearchResults } from './../display-search-results';
const myGlobal = global.fetch;

describe('stub for fetch', () => {
    // done tells jestti wait till the callback is called
    xit('stubing complete fetch', done => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });
        //spyOn().mockImplementation repaces the hole method
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        const wrapper = shallow(<MyComponent />);
        wrapper.instance().handlerChanger();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith({ "_bodyInit": "{\"email\":\"email\"}", "_bodyText": "{\"email\":\"email\"}", "credentials": "include", "headers": { "map": { "content-type": "application/json", "x-requested-with": "XMLHttpRequest" } }, "method": "POST", "mode": "cors", "referrer": null, "signal": undefined, "url": "ambient-supplementerapi/password/create" });

        process.nextTick(() => { // 6
            expect(wrapper.state()).toEqual({
                error: null,
                isLoaded: true,
            });

            global.fetch.mockClear(); // 7
            done(); // 8
        });
    });
    xit('stubing complete fetch', done => {

        //several different bodies
        // 1.
        const mockSuccessResponse = {};
        // 2.
        const fakeUser = {
            name: "Joni Baez",
            age: "32",
            address: "123, Charming Avenue"
        };
        // 3
        function mockApiResponse(body = {}) {
            return new window.Response(JSON.stringify(body), {
                status: 200,
                headers: { 'Content-type': 'application/json' }
            });
        }
        //....

        const mockJsonPromise = Promise.resolve(mockApiResponse(fakeUser)); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });
        //spyOn().mockImplementation repaces the hole method
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
        const wrapper = shallow(<MyComponent />);
        wrapper.instance().handlerChanger();
        expect(global.fetch).toHaveBeenCalledTimes(1);

        process.nextTick(() => { // 6
            expect(wrapper.state()).toEqual({
                error: null,
                isLoaded: true,
            });

            global.fetch.mockClear(); // 7
            done(); // 8
        });
    });
});

// https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
// https://medium.com/@mattiaerre/jest-unit-testing-with-components-that-use-node-fetch-711f8e9a0337
// https://www.reactnativeschool.com/mocking-fetch-api-calls-when-using-jest
// https://stackoverflow.com/questions/36069731/how-to-unit-test-api-calls-with-mocked-fetch-in-react-native-with-jest
// https://reactjs.org/docs/testing-recipes.html#data-fetching
//shit: das vereifacht vieles:fake fetch:
// https://reactjs.org/docs/testing-recipes.html#setup--teardown




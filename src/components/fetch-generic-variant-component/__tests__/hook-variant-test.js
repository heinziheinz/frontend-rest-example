import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useAnother from '../another-test';
import useFetch from '../use-fetch';

const useApiFetchMock = [{ title: 'Hello' }, { title: 'World' }];


const mockFetch = (mockData) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockData),
        })
    );
};
const mockFetchError = (error) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

const mockFetchCleanUp = () => {
    global.fetch.mockClear();
    delete global.fetch;
};


describe('useAnother Hook', () => {
    xit('test state and nextUpdated state', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useAnother());
        expect(result.current).toEqual(false);
        await waitForNextUpdate();
        expect(result.current).toEqual(true);
    });
    xit('test state and nextUpdated state', async () => {
        mockFetch(useApiFetchMock);
        const { result, waitForNextUpdate } = renderHook(() => useFetch('lorem', {}));
        expect(result.current).toMatchObject({
            isLoading: true,
            response: null,
            error: ''
        });
        await waitForNextUpdate();
        // console.log(result.current);
        expect(result.current).toMatchObject({
            isLoading: false,
            response: useApiFetchMock,
            error: ''
        });
        mockFetchCleanUp();
    });

    xtest('error state', async () => {
        mockFetchError('Network Error');
        const { result, waitForNextUpdate } = renderHook(() => useFetch('lorem', {}));
        // we will skip the tests for the initial state
        await waitForNextUpdate();
        console.log(result.current);
        expect(result.current).toMatchObject({
            isLoading: true,
            error: "Network Error",
            response: null,
        });
        mockFetchCleanUp();
    });
    it('test state and nextUpdated state', async () => {
        var controller = new AbortController();
        var signal = controller.signal;
        controller.abort();
        mockFetch(useApiFetchMock);
        const { result, waitForNextUpdate } = renderHook(() => useFetch('lorem', { signal: signal }));
        expect(result.current).toMatchObject({
            isLoading: true,
            response: null,
            error: ''
        });
        await waitForNextUpdate();
        // console.log(result.current);
        expect(result.current).toMatchObject({
            isLoading: false,
            response: useApiFetchMock,
            error: ''
        });
        mockFetchCleanUp();
    });

});
// Hier weiter:
// https://dev.to/nicomartin/how-to-test-async-react-hooks-392j
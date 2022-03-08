import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useApiFetch from './../useApi';

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

describe('useApi Hook', () => {
    test('initial and success state', async () => {
        mockFetch(useApiFetchMock);
        const { result, waitForNextUpdate } = renderHook(() => useApiFetch('lorem'));
        expect(result.current).toMatchObject({
            data: [],
            error: '',
            state: 'LOADING',
        });
        await waitForNextUpdate();
        expect(result.current).toMatchObject({
            data: useApiFetchMock,
            error: '',
            state: 'SUCCESS',
        });
        mockFetchCleanUp();
    });

    xtest('error state', async () => {
        mockFetchError('Network Error');
        const { result, waitForNextUpdate } = renderHook(() => useApiFetch('lorem'));
        // we will skip the tests for the initial state
        await waitForNextUpdate();
        expect(result.current).toMatchObject({
            data: [],
            error: 'fetch failed',
            state: 'ERROR',
        });
        mockFetchCleanUp();
    });
});
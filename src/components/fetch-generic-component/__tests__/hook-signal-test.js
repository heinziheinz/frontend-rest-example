import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
// import AbortController from 'node-abort-controller';
import useAnother from '../another-test';
import useFetch from '../use-fetch';

const useApiFetchMock = [{ title: 'Hello' }, { title: 'World' }];
const myGlobal = global.fetch;
global.fetch = require('jest-fetch-mock');
beforeEach(() => {
    global.fetch.resetMocks();
    jest.useFakeTimers();
});
afterEach(() => {
    global.fetch = myGlobal;
    jest.useRealTimers();
});
const mockFetchError = (error) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

describe('useAnother Hook', () => {
    xit('test state and nextUpdated state', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useAnother());
        expect(result.current).toEqual(false);
        await waitForNextUpdate();
        expect(result.current).toEqual(true);
    });
    xit('test state and nextUpdated state', async () => {
        // mockFetch(useApiFetchMock);
        // mockFetchError();
        fetch.mockResponseOnce(JSON.stringify({ message: 'first and allways' }), { status: 200 });
        const { result, waitForNextUpdate } = renderHook(() => useFetch('lorem', {}));
        expect(result.current).toMatchObject({
            isLoading: true,
            response: null,
            error: ''
        });
        await waitForNextUpdate();
        expect(result.current).toMatchObject({
            isLoading: false,
            response: { message: 'first and allways' },
            error: ''
        });
    });
    xit('test state and nextUpdated state', async () => {
        // mockFetch(useApiFetchMock);
        // mockFetchError();
        // fetch.mockAbortOnce();
        const controller = new AbortController()
        const signal = controller.signal
        setTimeout(() => controller.abort(), 500)
        fetch.mockReject('fake error message');
        const { result, waitForNextUpdate } = renderHook(() => useFetch('lorem', { signal }));
        expect(result.current).toMatchObject({
            isLoading: true,
            response: null,
            error: ''
        });
        await waitForNextUpdate();
        expect(result.current).toMatchObject({
            isLoading: true,
            response: null,
            error: 'fake error message'
        });
    });
    it('rejects when aborted before resolved', async () => {
        const c = new AbortController()
        fetch.mockResponse(async () => {
            jest.advanceTimersByTime(60)
            return ''
        })
        // setTimeout(() => c.abort(), 50)
        c.abort()
        await expect(fetch('/', { signal: c.signal })).rejects.toThrow('Aborted!')
    })

});
// Hier weiter:
// https://dev.to/nicomartin/how-to-test-async-react-hooks-392j
// ein artikel, wo es um AbortController geht und wie man den im test verwendet
// https://dev.to/bil/using-abortcontroller-with-react-hooks-and-typescript-to-cancel-window-fetch-requests-1md4
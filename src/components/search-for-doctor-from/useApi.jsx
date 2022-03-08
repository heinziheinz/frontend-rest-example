import React from 'react';

export const apiStates = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

const useApi = (url, options) => {
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;

    const [data, setData] = React.useState({
        state: apiStates.LOADING,
        error: '',
        data: [],
    });

    const setPartData = (partialData) => {
        console.log(partialData);
        setData({ ...data, ...partialData });
    }

    React.useEffect(() => {
        setPartData({
            state: apiStates.LOADING,
        });
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                setPartData({
                    state: apiStates.SUCCESS,
                    data
                });
            })
            .catch(() => {
                setPartData({
                    state: apiStates.ERROR,
                    error: 'fetch failed'
                });
            });
        return function cleanup() {
            myController.abort();
        };
    }, [options]);

    return data;
};

export default useApi;

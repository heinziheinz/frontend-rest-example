import React, { useEffect } from 'react';
import useApi from './useApi';

const FetchComponent = (props) => {

    useEffect(() => {
        const { state, error, data } = useApi(props);

    });
    switch (state) {
        case 'LOADING':
            return (
                <p>LOADING...</p>
            );
        case 'ERROR':
            return (
                <p>error</p>
            );
        case 'SUCCESS':
            // ROUTE to witch it will lead
            return (
                null
            );
    }
    return (null);
}
export default FetchComponent;
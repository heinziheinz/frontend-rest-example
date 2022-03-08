
import React from 'react';


const useFetch = (url, options) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    // const AbortController = window.AbortController;
    // var myController = new AbortController();
    // var mySignal = myController.signal;
    React.useEffect(() => {
        const fetchData = async () => {

            try {
                setIsLoading(true);
                console.log('so');
                const res = await fetch(url, options);
                // console.log(res.body);
                const json = await res.json();
                console.log(json);
                setResponse(json);
                // console.log('await');
                setIsLoading(false)
            } catch (error) {
                setError(error);
                console.log(error);
            }
        };
        fetchData();
    }, []);
    return { isLoading, response, error };
};

export default useFetch;
import React from 'react';
import useFetch from './use-fetch';

const FetchGenericComponent = () => {
    const optionsObject = {
        credentials: 'include',
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify({
        //     "email": 'email',
        // })// body data type must match "Content-Type" header
    };
    const res = useFetch(process.env.REACT_APP_URL + 'api / loggedin / prime / { prime }', optionsObject);
    console.log(res.response);
    console.log(res.error);
    console.log(res.response.message);
    if (!res.response) {
        return <div>Loading...</div>
    }
    const dogName = res.response.status
    const imageUrl = res.response.message
    return (
        <div className="App">
            <div>
                <h3>{res.error}</h3>
            </div>
        </div>
    );
}
export default FetchGenericComponent;


// api / loggedin / prime / { prime }   
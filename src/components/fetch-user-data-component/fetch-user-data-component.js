import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';


const GetUSerData = () => {
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;
    const [data, setRole] = React.useState(null);

    const handleFetchUserData = async (evt) => {
        // console.log(evt);
        // console.log('handle submit from pagination hook variant');
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            credentials: 'include',
            signal: mySignal
        }
        const primedata = await Fetcha(process.env.REACT_APP_URL + 'api/auth/user', options);
        // console.log(primedata);
        setRole(primedata.data);
    }
    const handleTestForTemporaryRoute = async (evt) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            credentials: 'include',
            signal: mySignal
        }
        const primedata = await Fetcha(process.env.REACT_APP_URL + 'api/users', options);
        // console.log(primedata);
        setRole(primedata.data);
    }
    const handleTestForTemporaryRoutePostRequest = async (evt) => {
        const data = {
            myName: 'hi there',
            headline: 'do wht du to'
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            signal: mySignal
        }
        const primedata = await Fetcha(process.env.REACT_APP_URL + 'api/basic/basic', options);
        // console.log(primedata);
        setRole(primedata.data);
    }

    const handleForLoginFallBack = async (event) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            credentials: 'include',
            signal: mySignal
        }
        const primedata = await Fetcha(process.env.REACT_APP_URL + "api/fallback/fallback", options);
        // console.log(primedata);
        setRole(primedata.role);
    }
    useEffect(() => {
        // console.log('fetch user data');
        return function cleanAllSubscribtion() {
            myController.abort();
        }
    }, []);

    return (
        <button onClick={() => {
            // handleFetchUserData();
            handleForLoginFallBack();
        }}>get User data</button>
    )
}

export default GetUSerData;
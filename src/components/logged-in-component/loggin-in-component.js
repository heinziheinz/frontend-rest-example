import React, { useState, useEffect } from 'react';
import BallTriangle from 'components/animated-ball-triangle';
import { Redirect, Route } from 'react-router-dom';
import LogoutComponent from './../logout-component';
import Fetcha from 'components/fetcha-component';
// import { NavBarStacked } from 'components/atoms';
import Cookies from 'js-cookie';
import NavBarStackedForPrivligedUser, { NavBarStackedForBasicUser } from 'components/nav-component';
// import StartSiteAfterLoginComponent from 'components/start-site-after-login-component';
const StartSiteAfterLoginComponent = React.lazy(() => import('components/start-site-after-login-component'));
// var Spinner = require('react-spinkit');

const LoggedIn = () => {
    const [hasError, setErrors] = useState(false);
    const [whichRole, setRole] = useState(null);
    const [links, setLinks] = useState({});
    const [data, setData] = React.useState({
    });
    const [whichName, setName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;

    //FIXME: fetch funktioiert nicht
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
        console.log('primedata.role');
        console.log(primedata);
        // setRole(primedata.role);
        setData({
            ...data, ...{
                linknameforarticleform: primedata.linksforadmin.linknameforarticleform,
                linknameforprofileform: primedata.linksforadmin.linknameforprofileform,
                linkurlforarticleform: primedata.linksforadmin.linkurlforarticleform,
                linkurlforprofileform: primedata.linksforadmin.linkurlforprofileform,
                role: primedata.role
            }
        });
        // setLinks(primedata.linksforadmin);
        // setData({ ...data, ...{ link: primedata.linksforadmin, role: primedata.role } });
        // setName(primedata.name);
        // console.log(whichRole === null);
    }
    useEffect(() => {
        handleForLoginFallBack();
    }, []);
    // TODO fetch, um zu verifizieren, on auch cookie gesetzt wurde
    const verifiedNavbar = Cookies.get('signedin') ? <NavBarStackedForBasicUser /> : 'redirect';//FIXME: mich fixen
    // Cookies.set('alreadyLoggedIn', false);

    let alredyLoggedIn = Cookies.get('alreadyLoggedIn');
    if (!data.hasOwnProperty('role') && alredyLoggedIn === undefined) {
        console.log('isLoading true');
        console.log(data);
        Cookies.set('alreadyLoggedIn', true, { secure: true });
        // Cookies.remove('alreadyLoggedIn');
        // console.log(whichName + ' '+ 'say is now');
        return (
            <div className="w3-animate-opacity"
                style={{
                    height: '400px',
                    backgroundColor: '#a5d8a5',
                    backgroundImage: 'linear-gradient(white, #a5d8a5)'
                }}></div>
            // <BallTriangle
            //     color={'red'}
            //     height={150}
            //     width={150}
            // />
        );
    } else if (data.hasOwnProperty('role')) {
        console.log('isLoading false');
        console.log(data);
        return (
            // TODO: Check, if it works
            <React.Fragment>
                {/* Route to Redirect you can find in basic-root-component.js */}
                <Redirect to={{
                    pathname: `/startpage/${data.role}`,
                    state: { role: data.role, data: data }
                }} />
            </React.Fragment>
        );
    } else {
        console.log('else');
        console.log(data);
        return (
            <>
                {/* <h3>Something went wrong</h3> */}
                <div className="w3-animate-opacity"
                    style={{
                        height: '400px',
                        backgroundColor: '#a5d8a5',
                        backgroundImage: 'linear-gradient(white, #a5d8a5)'
                    }}></div>
            </>
        );
    }
}
export default LoggedIn;
// adding studd to object state
// https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np
// https://dmitripavlutin.com/check-if-object-has-property-javascript/
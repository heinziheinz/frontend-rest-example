import React, { useEffect, useState, Suspense } from 'react';
import Cookies from 'js-cookie';
import { NavBarStackedForBasicUser } from 'components/nav-component';
const AbortController = window.AbortController;
const myController = new AbortController();
const mySignal = myController.signal;
const LogoutComponent = React.lazy(() => import('components/logout-component'));
const NavBarStackedForPrivligedUser = React.lazy(() => import('components/nav-component'));
const StartSiteComponentComponent = React.lazy(() => import('components/start-site-component-component'));



const WelcomePageAfterLogin = (props) => {
    // console.log(props.location.state);
    // console.log('WelcomePageAfterLogin');
    useEffect(() => {

    }, []);


    const verifiedNavbarForPrivligedUser = Cookies.get('signedin') ? <NavBarStackedForPrivligedUser role={props.location.state.role} data={props.location.state.data} /> : 'redirect';
    const verifiedNavbarForBasicUser = Cookies.get('signedin') ? <NavBarStackedForBasicUser role={props.location.state.role} data={props.location.state.data} /> : 'redirect';
    var stackedNavBar;
    // const stackedNavBar = props.location.state.role === 'basic' ? verifiedNavbarForBasicUser : verifiedNavbarForPrivligedUser;
    if (props.location.state.role === 'basic') {
        stackedNavBar = verifiedNavbarForBasicUser;
    } else if (props.location.state.role === 'admin') {
        stackedNavBar = verifiedNavbarForPrivligedUser;
    }
    return (

        <Suspense fallback={<div>loading</div>}>
            {/* <h2>{'Welcome' + ' ' + props.location.state.name + ' ' + 'Visitor'}</h2> */}
            <h3>{'Welcome' + ' ' + props.location.state.role + ' ' + 'Visitor'}</h3>
            {stackedNavBar}
            <LogoutComponent />
            <StartSiteComponentComponent />
        </Suspense>

    );
}

export default WelcomePageAfterLogin;
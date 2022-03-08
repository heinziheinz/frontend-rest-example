import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import ErrorBoundry from 'components/error-boundary';
const wichLocalStorageFooter = (Component, localStorage) => props => {
    // console.log('LocalStorage');
    // console.log(props.data);
    // console.log(props.path);
    // console.log(localStorage);
    // console.log(Component);
    if (localStorage !== null) window.localStorage.setItem(localStorage, JSON.stringify(props.data));
    // return <Redirect to={{
    //     pathname: props.path,
    //     state: { message: props, localStorage: localStorage }
    // }} />
    return (
        <ErrorBoundry>
            <Component data={props} />
        </ErrorBoundry>
    );
};
// wichLocalStorageFooter.displayName = `formValidation(${getDisplayName(Component)})`;
function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}
export default wichLocalStorageFooter;
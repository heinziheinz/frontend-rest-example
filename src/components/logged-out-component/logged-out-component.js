import React from 'react';
import Cookies from 'js-cookie';

function LoggedOut() {
    console.log('hi, I`m protected');
    Cookies.remove('signedin', { secure: true });
    Cookies.remove('logged-out', { secure: true });
    return (
        <React.Fragment>
            <h3>LoggedOut</h3>
        </React.Fragment>
    );
}
export default LoggedOut;
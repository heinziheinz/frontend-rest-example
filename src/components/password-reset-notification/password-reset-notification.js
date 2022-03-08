
import React from 'react';
import Cookies from 'js-cookie';

const PasswordResetNotification = (props) => {

    Cookies.remove('reset-password', { secure: true });

    return typeof props.location.state === "undefined" ? <p>redirecting</p> : <p>{props.location.state.message}</p>;
}
export default PasswordResetNotification;
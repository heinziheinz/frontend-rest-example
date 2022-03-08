import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';



const ResetPasswordFinalMessage = (props) => {
    Cookies.remove('finalMessage', { secure: true });
    return typeof props.location.state === "undefined" ? <p>redirecting</p> : <p>{props.location.state.message}</p>;
}


export default ResetPasswordFinalMessage;
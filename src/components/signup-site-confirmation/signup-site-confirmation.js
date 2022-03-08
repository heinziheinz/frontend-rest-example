import React from 'react';
import Cookies from 'js-cookie';

const SignUpConfirmation = (props) => {
    Cookies.remove('signupaction', { secure: true });
    return typeof props.location.state === "undefined" ? <p>redirecting</p> : <p>{props.location.state.signupMeassage}</p>;
}

export default SignUpConfirmation;
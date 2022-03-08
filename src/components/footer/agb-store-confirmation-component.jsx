import React, { useState } from 'react';
import SanitizedDisplay from 'components/footer/sanitized-display';
import { Redirect } from 'react-router-dom';
const AGB = (props) => {
    var loclaStorage = 'AGBsLocalStorage';
    const myState = {
        redirect: false
    };
    const [state, setState] = useState(myState);
    const redirect = () => {
        console.log('click it real good');
        setState({
            ...state,
            redirect: true
        });
    }
    // FIXME: dann im BRowser nachladen und testen, ob hier oder in jeweiliger ...-store-confirmation-componente.jsx
    const message = props?.location?.state?.message?.data?.message ? props?.location?.state?.message?.data?.message : JSON.parse(window.localStorage.getItem(props?.location?.state?.localStorage));
    console.dir(message);
    console.dir(props.data.data.message);

    setTimeout(function () {
        redirect();
    }, 2000);

    if (state.redirect === false) {
        return (
            <div>
                <p>message</p>
                <p>{props.data.data.message}</p>
                {/* <Redirect to={{
                pathname: `/agb-form`,
                query: true
            }} /> */}
            </div>
        );
    } else {
        localStorage.removeItem(loclaStorage);
        return (
            <Redirect to={{
                pathname: `/agb-form`,
                query: true
            }} />
        );
    }
}
export default AGB;
/**
 * Data structure:
 * Headline
 * block of text: subheadline, bulletpoints,
 */
// console.log(props?.location?.state?.localStorage);
// const message = props?.location?.state?.message?.data?.message ? props?.location?.state?.message?.data?.message : JSON.parse(window.localStorage.getItem(props?.location?.state?.localStorage));
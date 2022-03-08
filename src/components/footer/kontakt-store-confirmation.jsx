import React, { useState } from 'react';
import SanitizedDisplay from 'components/footer/sanitized-display';
import { Redirect } from 'react-router-dom';
const Kontakt = (props) => {
    var loclaStorage = 'KontaktLocalStorage';
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
    console.log('AGB-store-confirmation-component');
    console.log(props?.location?.state?.localStorage);
    console.log(props?.location?.state);
    // FIXME: dann im BRowser nachladen und testen, ob hier oder in jeweiliger ...-store-confirmation-componente.jsx
    const message = props?.location?.state?.message?.data?.message ? props?.location?.state?.message?.data?.message : JSON.parse(window.localStorage.getItem(props?.location?.state?.localStorage));
    console.log(message);

    setTimeout(function () {
        redirect();
    }, 2000);

    if (state.redirect === false) {
        return (
            <div>
                <p>message</p>
                <p>{props.data.data.message}</p>

            </div>
        );
    } else {
        localStorage.removeItem(loclaStorage);
        return (
            <Redirect to={{
                pathname: `/kontakt-form`,
                query: true
            }} />
        );
    }
}
export default Kontakt;
/**
 * Data structure:
 * Headline
 * block of text: subheadline, bulletpoints,
 */
// console.log(props?.location?.state?.localStorage);
// const message = props?.location?.state?.message?.data?.message ? props?.location?.state?.message?.data?.message : JSON.parse(window.localStorage.getItem(props?.location?.state?.localStorage));
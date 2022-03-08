import React from 'react';
import { Redirect } from 'react-router-dom';
import SanitizedDisplay from 'components/footer/sanitized-display';
const FQA = (props) => {
    // console.log(props.data.mydata);
    // const myStateHeadlineSubheadlineCaptions = ['headline', 'subheadline', 'captions'];
    // if (myStateHeadlineSubheadlineCaptions.includes(data)) { }
    console.log('AGB-store-confirmation-component');
    console.log(props?.location?.state?.localStorage);
    // FIXME: dann im BRowser nachladen und testen, ob hier oder in jeweiliger ...-store-confirmation-componente.jsx
    const message = props?.location?.state?.message?.data?.message ? props?.location?.state?.message?.data?.message : JSON.parse(window.localStorage.getItem(props?.location?.state?.localStorage));
    console.dir(message);
    console.dir(props.data.data.message);
    // const message = props?.data ? props?.data : null;
    // console.log(message.message);
    // var keys = Object.keys || require('object-keys');
    // const arrayOfkeyOfState = keys(props.data);
    // // console.log(arrayOfkeyOfState);
    // const mySanitizedText = SanitizedDisplay(props.data, arrayOfkeyOfState);
    return (
        <>
            <div>
                <p>message</p>
                <p>{props.data.data.message}</p>

            </div>
            {/* <Redirect/> */}
            <Redirect to={{
                pathname: `/fqa-form`,
                query: true
            }} />
        </>
    );
}
export default FQA;
/**
 * Data structure:
 * Headline
 * block of text: subheadline, bulletpoints,
 */
// console.log(props?.location?.state?.localStorage);
// const message = props?.location?.state?.message?.data?.message ? props?.location?.state?.message?.data?.message : JSON.parse(window.localStorage.getItem(props?.location?.state?.localStorage));
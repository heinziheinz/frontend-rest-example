import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UpdateAGBFromComponent from 'components/footer/update-agb-form-component';
import SanitizedDisplay from 'components/footer/sanitized-display';
import HOCFooterDesroyAGB from 'components/footer/HOC-footer-destroy-fetch-agb';
import AGBStoreConfirmationComponent from 'components/footer/agb-store-confirmation-component';
import Cookies from 'js-cookie';
const AGB = (props) => {
    useEffect(() => {
        return function cleanup() {
            console.log('clean');
            var loclaStorage = 'AGBsLocalStorage';
            localStorage.removeItem(loclaStorage);
        };
    });
    const myState = {
        delete: false
    };
    const [state, setState] = useState(myState);
    const deleteAGBS = (event) => {
        console.log('click it real good');
        setState({
            ...state,
            delete: true
        });
    }
    console.log(props.data.data.content[0]);
    if (props.data.data.content[0] === undefined) {
        return <h3>We are sorry, something went wrong!</h3>;
    }
    var keys = Object.keys || require('object-keys');
    const arrayOfkeyOfState = keys(props.data.data.content[0]);
    // console.log(arrayOfkeyOfState);
    const mySanitizedText = SanitizedDisplay(props.data.data.content[0], arrayOfkeyOfState);
    console.log(mySanitizedText);
    var mypros = props.data.data.content[0];
    console.log(state);
    let id = props.data.data.content[0].id;

    <div>{Cookies.get('signedin') === 'true' ? (
        <div>
            <div><Link to={{ pathname: "/agb-form/psy-agbs", query: { mypros } }} >{'UpdateyourAGBs'}</Link></div>
            <Route path="/agb-form/psy-agbs" render={props => <UpdateAGBFromComponent {...props} items={mypros} />} />
            <Button color="secondary" onClick={deleteAGBS}>{'Delete Your AGBs'}</Button>
            <Route path="/agb-form/agbs-deleted" component={AGBStoreConfirmationComponent} />
        </div>
    ) : (
        <div></div>
    )}</div>
    if (state.delete === false) {
        return (
            <div>
                <h2>{mypros.headline}</h2>
                <div>{mySanitizedText}</div>
                <div>{Cookies.get('signedin') === 'true' ? (
                    <div>
                        <div><Link to={{ pathname: "/agb-form/psy-agbs", query: { mypros } }} >{'UpdateyourAGBs'}</Link></div>
                        <Route path="/agb-form/psy-agbs" render={props => <UpdateAGBFromComponent {...props} items={mypros} />} />
                        <Button color="secondary" onClick={deleteAGBS}>{'Delete Your AGBs'}</Button>
                        <Route path="/agb-form/agbs-deleted" component={AGBStoreConfirmationComponent} />
                    </div>
                ) : (
                    <div></div>
                )}</div>
            </div>
        );
    } else {
        return (
            <>
                <div>Deleted</div>
                <HOCFooterDesroyAGB id={id} />
            </>
        );
    }
}
export default AGB;
/**
 * Data structure:
 * Headline
 * block of text: subheadline, bulletpoints,
 */
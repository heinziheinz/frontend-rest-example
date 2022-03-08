import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UpdateKontaktFromComponent from 'components/footer/update-kontakt-form-component';
import AGBsanitizedDisplay from 'components/footer/sanitized-display-agb';
import HOCFooterDesroyKontakt from 'components/footer/HOC-footer-destroy-fetch-kontakt';
import KontaktStoreConfirmationComponent from 'components/footer/kontakt-store-confirmation';
import Cookies from 'js-cookie';
import {
    FooterComponentLeftWithoutH5,
    FooterComponentsMiddleWithoutH5,
    FooterComponentsRightWithoutH5
} from 'components/footer/footer-components';
const Kontakt = (props) => {
    useEffect(() => {
        return function cleanup() {
            // console.log('clean');
            var loclaStorage = 'KontaktLocalStorage'
            localStorage.removeItem(loclaStorage);
        };
    });
    const myState = {
        delete: false
    };
    const [state, setState] = useState(myState);
    const deleteKontakt = (event) => {
        // console.log('click it real good');
        setState({
            ...state,
            delete: true
        });
    }
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    React.useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
            console.log(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize);
        }
    });
    if (props.data.data.content[0] === undefined) {
        return <h3>We are sorry, something went wrong!</h3>;
    }
    var mypros = props.data.data.content[0];
    let id = props.data.data.content[0].id;

    <div>{Cookies.get('signedin') === 'true' ? (
        <div>
            <div><Link to={{ pathname: "/kontakt-form/psy-kontakt", query: { mypros } }} >{'UpdateyourKontakt'}</Link></div>
            <Route path="/kontakt-form/psy-kontakt" render={props => <UpdateKontaktFromComponent {...props} items={mypros} />} />
            <Button color="secondary" onClick={deleteKontakt}>{'Delete Your Kontakt'}</Button>
            <Route path="/kontakt-form/kontakt-deleted" component={KontaktStoreConfirmationComponent} />
        </div>
    ) : (
        <div></div>
    )}</div>
    if (state.delete === false) {
        return (
            <div
                style={{
                    "boxShadow": "10px 10px 30px #aaaaaa",
                    "width": "85%"
                }}
            >
                <div className='jumbotron pt-4'>
                    <h2>{props.data.data.content[0].headline}</h2>
                </div>
                <div className={dimensions.width > 1050 ? 'd-flex' : ''}>
                    <div className='w-75'
                        style={{ "padding": "40px", "paddingLeft": "50px", "paddingTop": "20px" }}
                    >
                        <p>{props.data.data.content[0].stipulation}</p>
                        <p><b>Psy Online Email Adresse:</b>{' ' + props.data.data.content[0].email}</p>
                        <p><b>Psy Online Telefonnummer:</b>{' ' + props.data.data.content[0].telefonnumber}</p>
                    </div>
                    <div style={{
                        "marginTop": dimensions.width > 1050 ? '30px' : '-10px',
                        "marginLeft": dimensions.width > 1050 ? '20px' : '50px',
                        "paddingBottom": dimensions.width > 1050 ? '0' : '34px',
                        "borderLeft": "1px solid #000",
                        // "backgroundColor": dimensions.width > 1050 ? "green" : 'blue'
                    }}
                        className='pl-4 pt-4'>
                        <FooterComponentsMiddleWithoutH5 />
                        <FooterComponentsRightWithoutH5 />
                    </div>
                </div>
                <div>{Cookies.get('signedin') === 'true' ? (
                    <div>
                        <div><Link to={{ pathname: "/kontakt-form/psy-kontakt", query: { mypros } }} >{'UpdateyourKontakt'}</Link></div>
                        <Route path="/kontakt-form/psy-kontakt" render={props => <UpdateKontaktFromComponent {...props} items={mypros} />} />
                        <Button color="secondary" onClick={deleteKontakt}>{'Delete Your Kontakt'}</Button>
                        <Route path="/kontakt-form/kontakt-deleted" component={KontaktStoreConfirmationComponent} />
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
                <HOCFooterDesroyKontakt id={id} />
            </>
        );
    }
}
export default Kontakt;
/**
 * Data structure
 * headline
 * belowheadline
 * elmail
 * Telefon
 * blockoftext:
 *
 * Kontaktaufnahme mit Psy Online
 * Emailkontakt: psy-online@gmx.at
 * Telefon: 0650 888 999 7
 */
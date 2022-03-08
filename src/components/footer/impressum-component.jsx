import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UpdateImpressumFromComponent from 'components/footer/update-impressum-form-component';
import SanitizedDisplay from 'components/footer/sanitized-display';
import HOCFooterDesroyImpressum from 'components/footer/HOC-footer-destroy-fetch-impressum';
import ImpressumStoreConfirmationComponent from 'components/footer/impressum-store-confirmation';
import Cookies from 'js-cookie';
import {
    FooterComponentLeftWithoutH5,
    FooterComponentsMiddleWithoutH5,
    FooterComponentsRightWithoutH5
} from 'components/footer/footer-components';

const Impressum = (props) => {
    useEffect(() => {
        return function cleanup() {
            // console.log('clean');
            var loclaStorage = 'ImpressumLocalStorage';
            localStorage.removeItem(loclaStorage);
        };
    });
    const myState = {
        delete: false
    };
    const [state, setState] = useState(myState);
    const deleteImpressum = (event) => {
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
        console.log('SINGLE RENDER BENDER');
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
    var keys = Object.keys || require('object-keys');
    const arrayOfkeyOfState = keys(props.data.data.content[0]);
    // console.log(arrayOfkeyOfState);
    const mySanitizedText = SanitizedDisplay(props.data.data.content[0], arrayOfkeyOfState);
    // console.log(mySanitizedText);
    var mypros = props.data.data.content[0];
    let id = props.data.data.content[0].id;

    if (state.delete === false) {
        return (
            <div
                style={{
                    "boxShadow": "10px 10px 30px #aaaaaa",
                    "width": "85%"
                }}
            >
                <div className='jumbotron pt-4'>
                    <h2>{mypros.headline}</h2>
                </div>
                <div className={dimensions.width > 1050 ? 'd-flex' : ''}>
                    <div className='w-75'
                        style={{ "padding": "40px", "paddingLeft": "50px", "paddingTop": "20px" }}
                    >
                        {mySanitizedText}
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
                        <div><Link to={{ pathname: "/impressum-form/psy-impressum", query: { mypros } }} >{'UpdateyourImpressum'}</Link></div>
                        <Route path="/impressum-form/psy-impressum" render={props => <UpdateImpressumFromComponent {...props} items={mypros} />} />
                        <Button color="secondary" onClick={deleteImpressum}>{'Delete Your Impressum'}</Button>
                        <Route path="/impressum-form/impressum-deleted" component={ImpressumStoreConfirmationComponent} />
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
                <HOCFooterDesroyImpressum id={id} />
            </>
        );
    }
}
export default Impressum;
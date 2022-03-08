import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import UpdateMediaTarifeFromComponent from 'components/footer/update-media-tarife-form-component';
import SanitizedDisplay from 'components/footer/sanitized-display';
import HOCFooterDesroyMediaTarife from 'components/footer/HOC-footer-destroy-fetch-mediadaten-tarife';
import MediaTarifeStoreConfirmationComponent from 'components/footer/mediadaten-tarife-store-confirmation-component';
import Cookies from 'js-cookie';
import {
    FooterComponentLeftWithoutH5,
    FooterComponentsMiddleWithoutH5,
    FooterComponentsRightWithoutH5
} from 'components/footer/footer-components';
const Mediatarife = (props) => {
    useEffect(() => {
        return function cleanup() {
            console.log('clean');
            var loclaStorage = 'WerbeLocalStorage';
            localStorage.removeItem(loclaStorage);
        };
    });
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
    const beforeLoadFunction = () => {
        localStorage.removeItem('WerbeLocalStorage')
        window.removeEventListener("beforeunload", beforeLoadFunction);
    }
    window.addEventListener("beforeunload", beforeLoadFunction);
    const myState = {
        delete: false
    };
    const [state, setState] = useState(myState);
    const deleteMediatarife = (event) => {
        console.log('click it real good');
        setState({
            ...state,
            delete: true
        });
    }
    if (props.data.data.content[0] === undefined) {
        return <h3>We are sorry, something went wrong!</h3>;
    }
    var keys = Object.keys || require('object-keys');
    const arrayOfkeyOfState = keys(props.data.data.content[0]);
    console.log(arrayOfkeyOfState);
    const mySanitizedText = SanitizedDisplay(props.data.data.content[0], arrayOfkeyOfState);
    console.log(mySanitizedText);
    var mypros = props.data.data.content[0];
    let id = props.data.data.content[0].id;

    <div>{Cookies.get('signedin') === 'true' ? (
        <div>
            <div> <Link to={{ pathname: "/media-tarife-form/psy-media-tarife", query: { mypros } }} >{'UpdateyourMediaTarife'}</Link></div>
            <Route path="/media-tarife-form/psy-media-tarife" render={props => <UpdateMediaTarifeFromComponent {...props} items={mypros} />} />
            <Button color="secondary" onClick={deleteMediatarife}>{'Delete Your Media Tarifs'}</Button>
            <Route path="/media-tarife-form/media-tarife-deleted" component={MediaTarifeStoreConfirmationComponent} />
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
                    <h2>{mypros.headline}</h2>
                    <h3>{mypros.subheadline}</h3>
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
                        <div> <Link to={{ pathname: "/media-tarife-form/psy-media-tarife", query: { mypros } }} >{'UpdateyourMediaTarife'}</Link></div>
                        <Route path="/media-tarife-form/psy-media-tarife" render={props => <UpdateMediaTarifeFromComponent {...props} items={mypros} />} />
                        <Button color="secondary" onClick={deleteMediatarife}>{'Delete Your Media Tarifs'}</Button>
                        <Route path="/media-tarife-form/media-tarife-deleted" component={MediaTarifeStoreConfirmationComponent} />
                    </div>
                ) : (
                    <div></div>
                )}</div>
            </div >
        );
    } else {
        return (
            <>
                <div>Deleted</div>
                <HOCFooterDesroyMediaTarife id={id} />
            </>
        );
    }
}
export default Mediatarife;
/**
 * Mediatarife structure:
 * headline, subheadline, text
 */
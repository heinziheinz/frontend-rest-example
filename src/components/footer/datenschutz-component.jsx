import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import sanitizedDisplay from 'components/footer/sanitized-display';
import { Route, Link } from 'react-router-dom';
import UpdateDatenschutzFromComponent from 'components/footer/update-datenschutz-form-component';
import HOCFooterDesroyDatenschutz from 'components/footer/HOC-footer-destroy-fetch-datenschutz';
import DatenschutzStoreConfirmationComponent from 'components/footer/datenschutz-store-confirmation-component';
import Cookies from 'js-cookie';
import {
    FooterComponentLeftWithoutH5,
    FooterComponentsMiddleWithoutH5,
    FooterComponentsRightWithoutH5
} from 'components/footer/footer-components';
const Datenschutz = (props) => {
    useEffect(() => {
        return function cleanup() {
            console.log('clean');
            var loclaStorage = 'DatenschutzLocalStorage';
            localStorage.removeItem(loclaStorage);
        };
    });
    const myState = {
        delete: false
    };
    const [state, setState] = useState(myState);
    const deleteDatenschutz = (event) => {
        console.log('click it real good');
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
    console.log((props.data.data.content[0]));
    if (props.data.data.content[0] === undefined) {
        return <h3>We are sorry, something went wrong!</h3>;
    }
    var keys = Object.keys || require('object-keys');
    const arrayOfkeyOfState = keys(props.data.data.content[0]);
    console.log(arrayOfkeyOfState);
    const mySanitizedText = sanitizedDisplay(props.data.data.content[0], arrayOfkeyOfState);
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
                        <div><Link to={{ pathname: "/datenschutz-form/psy-datenschutz", query: { mypros } }} >{'UpdateyourDatenschutz'}</Link></div>
                        <Route path="/datenschutz-form/psy-datenschutz" render={props => <UpdateDatenschutzFromComponent {...props} items={mypros} />} />
                        <Button color="secondary" onClick={deleteDatenschutz}>{'Delete Your Datenschutz'}</Button>
                        <Route path="/datenschutz-form/datenschutz-deleted" component={DatenschutzStoreConfirmationComponent} />
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
                <HOCFooterDesroyDatenschutz id={id} />
            </>
        );
    }
}
export default Datenschutz;
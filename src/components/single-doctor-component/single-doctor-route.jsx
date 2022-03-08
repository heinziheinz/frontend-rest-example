import React, { useEffect, Suspense } from 'react';
import { Helmet } from "react-helmet";
import { Route, useParams } from 'react-router-dom';
import Fetcha from 'components/fetcha-component/fetcha-component';
import SanitizedDisplay from 'components/footer/sanitized-display';
import {
    PortraiFotoPrimeCustomer,
    BewertungsBottom,
    ÖffungszeitenPrimeCustomer,
    KrankenkasseFachbereich
} from 'components/footer/single-doctor-route-component';
const ErrorBoundary = React.lazy(() => import('components/error-boundary'));
const SingleDoctorRouteComponent = React.lazy(() => import('components/footer/single-doctor-route-component'));
const SingleDoctorSubRouteComponent = React.lazy(() => import('./single-doctor-sub-route-component'));


const SingleDoctorComponent = (props) => {
    console.log('SINGLE DOCT');
    const [primeCustomer, setPrimeCustomer] = React.useState([]);
    const [hasBeenFetched, setHasBeenFetched] = React.useState(false);
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    // var data = props.location?.query?.data;
    const currentURL = window.location.href;
    // console.log(props.location?.query?.data);
    const { id } = useParams();
    var myStorage = null;
    console.log(id);
    const MyHref = window.location.href;
    console.log(MyHref);
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;
    // if (typeof props.location?.query?.data === "undefined") {
    //     data = JSON.parse(localStorage.getItem(currentURL));
    //     console.log(data.description === 'undefined');
    // }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
        },
        mode: 'cors',
        credentials: 'include',
        signal: mySignal
    }
    const handleFetchPrimeCustomerData = async (evt) => {
        console.log('handleFetchMAINStorageData');
        // console.log(id);
        // GET|HEAD  | api/loggedin/prime/{prime} 
        console.log(process.env.REACT_APP_URL + 'api/loggedin/prime?' + id + '=number');
        const singlePrimeCustomer = await Fetcha(process.env.REACT_APP_URL + 'api/loggedin/prime?' + id + '=number', options);
        console.log(singlePrimeCustomer)
        setPrimeCustomer(singlePrimeCustomer);
        localStorage.setItem(MyHref, JSON.stringify(singlePrimeCustomer[0]));
    }
    useEffect(() => {
        if (localStorage.getItem(MyHref) === null) {
            handleFetchPrimeCustomerData();
        } else {
            if (hasBeenFetched === false) {
                setHasBeenFetched(true);
            }
        }

    }, [primeCustomer]);

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


    try {
        myStorage = JSON.parse(localStorage.getItem(MyHref));
    } catch (e) {
        console.log(e);
        return <h2>Ein Fehler ist aufgetreten</h2>;
    }
    if (localStorage.getItem(MyHref) === null) {
        return (<p></p>);
    } else {
        // TODO: hier weiter
        if (dimensions.width > 1000) {
            console.log('Hallo DIMENSIONS');
            return (
                // null
                <Suspense fallback={<div>Loading</div>}>
                    <SingleDoctorSubRouteComponent
                        myStorage={myStorage}
                        dimensions={dimensions}
                        widthDiv={'1200px'}
                        imageNumber={2}
                        marginLeftTrenner={"0px"}
                        widthTrenner={"800px"}
                        portraiImage={'130px'}
                        paddingLeftTerminvereinbahrung={'133px'}
                        flexOrNot={"d-flex"}
                        oeffungszeitenLeftMargin={'135px'}
                        trennerHeightÖffungszeiten={"200px"}
                        trennerWidthÖffungszeiten={"0px"}
                        gesprocheneSpracheMarginTop={"0px"}
                        krankenkasseFachbereichFlex={"d-flex"}
                        marginTop={'0px'}
                        namenUndDatenMarginTop={"50px"}
                    />
                </Suspense>
            );
        } else if (dimensions.width > 500) {
            return (
                // null
                <Suspense fallback={<div>Loading</div>}>
                    <SingleDoctorSubRouteComponent
                        myStorage={myStorage}
                        dimensions={dimensions}
                        widthDiv={'800px'}
                        imageNumber={1}
                        marginLeftTrenner={"-15px"}
                        widthTrenner={"500px"}
                        portraiImage={'130px'}
                        paddingLeftTerminvereinbahrung={'133px'}
                        flexOrNot={"d-flex"}
                        oeffungszeitenLeftMargin={'135px'}
                        trennerHeightÖffungszeiten={"200px"}
                        trennerWidthÖffungszeiten={"0px"}
                        gesprocheneSpracheMarginTop={"0px"}
                        krankenkasseFachbereichFlex={"d-flex"}
                        marginTop={'0px'}
                        namenUndDatenMarginTop={"50px"}
                    />
                </Suspense>
            );

        } else if (dimensions.width <= 500) {

            return (
                // null
                <Suspense fallback={<div>Loading</div>}>
                    <SingleDoctorSubRouteComponent
                        myStorage={myStorage}
                        dimensions={dimensions}
                        widthDiv={'500px'}
                        imageNumber={1}
                        marginLeftTrenner={"-15px"}
                        widthTrenner={"500px"}
                        portraiImage={'30px'}
                        paddingLeftTerminvereinbahrung={'20px'}
                        flexOrNot={null}
                        oeffungszeitenLeftMargin={'20px'}
                        trennerHeightÖffungszeiten={"0px"}
                        trennerWidthÖffungszeiten={"40px"}
                        gesprocheneSpracheMarginTop={"12px"}
                        krankenkasseFachbereichFlex={null}
                        marginTop={'20px'}
                        namenUndDatenMarginTop={"0px"}
                    />
                </Suspense>
            );
        } else {
            return <div>Something went wrong</div>;
        }
    }
}
const SingleDoctorRoute = () => < Route path="/prime-doctor/:id" component={SingleDoctorComponent} />

export default SingleDoctorRoute;
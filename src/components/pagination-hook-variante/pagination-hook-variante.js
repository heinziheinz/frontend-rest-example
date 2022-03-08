import React, { useEffect, Suspense, useLayoutEffect } from 'react';
import { Switch, Redirect, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import SpecialForm from 'components/search-for-doctor-from/special-form';
import Fetcha from 'components/fetcha-component/fetcha-component';
import useMyState from 'components/use-state';
import { SpaceForUnderScoreAndToLowerCase, AllToLowerCase } from 'components/regex-collection';
import HandleEmptyResponse from 'components/handle-empty-respones';
const ObjectHookExample = React.lazy(() => import('./object-hook-example'));
const Arti = React.lazy(() => import('./arti'));
const PaginationNavigation = React.lazy(() => import('./third-handler'));


function getDefaultProps(myState) {
    return (
        {
            searchfordoctor: myState.searchfordoctor !== ''
                ? myState.searchfordoctor
                : '',
            location: myState.location !== '' ? myState.location : '',
            bundesland: myState.bundesland !== '' ? myState.bundesland : '',
            bezirk: myState.bezirk !== '' ? myState.bezirk : '',
            thema: myState.thema !== '' ? myState.thema : ''
        }
    )
}

const TriggerHistoryPush = (props) => {
    console.log('Pagination Hook History Push');
    // console.log(props.pathname);
    const history = useHistory();
    // console.log(props);
    // console.log(history);
    // console.log(history.goBack);
    const hanhleHistoryPush = () => {
        history.push({
            pathname: props.pathname
        });
    }
    useEffect(
        () => {
            hanhleHistoryPush();
        });
    return (null);
}



const CompositionComponent = (props) => {
    const [myData, setData] = React.useState({});
    const [hasBeenFetched, setHasBeenFetched] = React.useState(false);
    const [myState, setState] = useMyState({
        searchfordoctor: '',
        location: '',
        state: '',
        bundesland: '',
        bezirk: '',
        thema: ''
    });
    // if (redirected === true) setHasBeenRedirected(false);
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;
    const history = useHistory();
    // console.log(history);
    // var myStorage = null;
    const MyHref = window.location.href;
    console.log(MyHref);
    // MyHref.slice(url.indexOf("?"))
    const urlParam = Object.fromEntries([...new URLSearchParams(MyHref.slice(MyHref.indexOf("?")))]);
    console.log(urlParam);
    // console.log(urlParam.bundesland); // { bundesland: 'Wien', name: 'Dr. Karl' }
    // console.log(urlParam.name); // { bundesland: 'Wien', name: 'Dr. Karl' }


    // const currentURL = window.location.href;
    // console.log('Pagination hokk variante');
    // TODO: hier nach localStorage schauen

    const handleOnChange = (props) => {
        const { name, value } = props.target;
        // console.log(urlParam.bundesland);
        console.log(value);
        // console.log(localStorage.getItem(MyHref));
        setState({
            ...myState,
            [name]: value
        });

    }
    const handleOptionValue = (event) => {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);

        console.log(event.target);
        setState({
            ...myState,
            [name]: value
        });
    }
    const onSubmit = () => {
        // console.log('OnSubMIT');
        console.log(myState);
        let defaultProps = getDefaultProps(myState);
        localStorage.setItem('paginationRedirect', true);
        // TODO: HIER WEITER
        // handleOnSubmit(defaultProps.location, defaultProps.searchfordoctor, defaultProps.bundesland, defaultProps.bezirk, defaultProps.thema);
        handleOnSubmit(defaultProps.bundesland, defaultProps.searchfordoctor, defaultProps.thema, defaultProps.bezirk, defaultProps.location)
    }

    const handleOnSubmit = async (bundesland, name, thema, bezirk, stadtorpostleitzahl) => {
        console.log('Pagination Fetch');
        console.log(bundesland);
        console.log(name);
        console.log(thema);
        console.log(bezirk);
        console.log(stadtorpostleitzahl);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            signal: mySignal
        }
        const primedata = await Fetcha(process.env.REACT_APP_URL + 'api/loggedin/prime/{prime}' + '?bundesland=' + bundesland + '&name=' + name + '&stadtorpostleitzahl=' + stadtorpostleitzahl + '&bezirk=' + bezirk + '&thema=' + thema, options);
        setData(primedata);
    }
    // useEffect(() => {
    // console.log(myState);
    // }, [myState]);
    useEffect(() => {
    }, []);

    useEffect(() => {
        if (localStorage.getItem(MyHref) === null) {

            handleOnSubmit(urlParam.bundesland, urlParam.name, urlParam.thema, urlParam.bezirk, urlParam.stadtorpostleitzahl);
            // (bundesland, name, thema, bezirk, stadtorpostleitzahl)
        } else {

            if (hasBeenFetched === false) {
                // damit nochmalsgerendert wird, und das gefechte gerendert
                setHasBeenFetched(true);
            }
        }
        return function cleanAllSubscribtion() {
        }
    }, []);//FIXME: [myData] removed: endless loop, if data

    try {
        if (myData.data !== undefined && JSON.parse(localStorage.getItem(MyHref)) === null) {
            localStorage.setItem(MyHref, JSON.stringify(myData));
        }
    } catch (e) {
        // console.log(e);
        return <h2>Ein Fehler ist aufgetreten</h2>;
    }
    if (localStorage.getItem(MyHref) === null) {
        console.log('nullo');
        return (<p>is So null</p>);
    } else {
        // console.log(myStorage);
        console.log('Hit just right');
        let myStorage = JSON.parse(localStorage.getItem(MyHref));
        if (myStorage?.data === null) return <p>...loading</p>;
        const handleEmptyResponse = HandleEmptyResponse(myStorage?.data);
        console.log(handleEmptyResponse);
        const FormComponent = (
            <ObjectHookExample
                data={handleEmptyResponse}
                upOrDown={true}
                paginationNavigation={
                    <PaginationNavigation />
                }
                arti={
                    <Arti />
                }
            />
        );
        console.log(JSON.parse(localStorage.getItem('paginationRedirect')) === null);
        if (JSON.parse(localStorage.getItem('paginationRedirect')) === null) {
            return (
                <>
                    <Helmet>
                        <title>{urlParam.name + ' ' + urlParam.bundesland + ' - ' + process.env.REACT_APP_DEV_URL_TITLE}</title>
                        <meta name="description"
                            content="Suchergebnisse der Psychologensuche Psyonline.at." />
                        <link rel="canonical" href={MyHref} />
                    </Helmet>
                    <SpecialForm
                        mystate={myState}
                        handleOnChange={e => handleOnChange(e)}
                        handlerOnSubmit={() => {
                            onSubmit();
                            // props.onChange();
                        }}
                        handleOptionValue={e => {
                            handleOptionValue(e);
                            // props.onChange();
                        }}
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                        {FormComponent}
                    </Suspense>
                </>
            );
        } else if (JSON.parse(localStorage.getItem('paginationRedirect')) === true) {
            console.log('Redirect Pagination');
            localStorage.removeItem('paginationRedirect');
            let defaultProps = getDefaultProps(myState);
            let name = SpaceForUnderScoreAndToLowerCase(defaultProps.searchfordoctor);
            let stadtorpostleitzahl = AllToLowerCase(defaultProps.location);
            let bundesland = AllToLowerCase(defaultProps.bundesland);
            let thema = AllToLowerCase(defaultProps.thema);
            let bezirk = SpaceForUnderScoreAndToLowerCase(defaultProps.bezirk);
            return (
                <TriggerHistoryPush
                    pathname={"/search-result" + "-" + "?" + "bundesland=" + bundesland + "&name=" + name + "&thema=" + thema + "&bezirk=" + bezirk + "&stadtorpostleitzahl=" + stadtorpostleitzahl}
                />
            );
        } else {
            return (<p>...Loading</p>);
        }
    }
}

export default CompositionComponent;

// https://stackoverflow.com/questions/2326943/when-do-items-in-html5-local-storage-expire
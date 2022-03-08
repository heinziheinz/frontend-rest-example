import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import useMyState from 'components/use-state';
import PaginationResult from 'components/pagination-hook-variante/pagination-hook-variante';
import Fetcha from 'components/fetcha-component';
import SpecialForm from './special-form';
import { SpaceForUnderScoreAndToLowerCase, AllToLowerCase } from 'components/regex-collection';
import HandleEmptyResponse from 'components/handle-empty-respones';

// FIXME: bundesland
function getDefaultProps(myState) {
    return (
        {
            searchfordoctor: myState.searchfordoctor !== ''
                ? myState.searchfordoctor
                : '',
            location: myState.location !== '' ? myState.location : '',
            bundesland: myState.bundesland !== '' ? myState.bundesland : '',
            bezirk: myState.bezirk !== '' ? myState.bezirk : '',
            thema: myState.thema !== '' ? myState.thema : '',
            searchfordoctor: myState.searchfordoctor !== '' ? myState.searchfordoctor : ''
        }
    )
}

const TriggerHistoryPush = (props) => {
    console.log('Search Form History Push');
    const history = useHistory();
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


const SearchForDoctorForm = (props) => {
    const AbortController = window.AbortController;
    const myController = new AbortController();
    const mySignal = myController.signal;
    const [myState, setState] = useMyState({
        searchfordoctor: '',
        location: '',
        state: '',
        bundesland: '',
        bezirk: '',
        thema: ''
    });
    const [data, setData] = React.useState(false);

    const handleOnChange = (props) => {
        const { name, value } = props.target;
        // console.log(value);
        // console.log(name);
        setState({
            ...myState,
            [name]: value
        });

    }
    const handleOptionValue = (event) => {
        const { name, value } = event.target;
        // console.log(name);
        // console.log(value);

        console.log(event.target);
        setState({
            ...myState,
            [name]: value
        });
    }

    const handleOnSubmit = async evt => {
        console.log('HANDLE ON SUBMIT');
        setData(true);
    }


    useEffect(() => {
        console.log('searcgForDoctorSTART');
        return function cleanAllSubscribtion() {
            // console.log('search form has benn CEEREEEEE');
            myController.abort();
        }
    }, [data]);
    // console.log(data);
    // console.log(props.location.pathname.length);
    if (!data) {
        // console.log(myState);
        // console.log(props.location.pathname);
        return (
            <>
                <SpecialForm
                    mystate={myState}
                    handleOnChange={e => handleOnChange(e)}
                    handlerOnSubmit={(e) => {
                        handleOnSubmit(e);
                        // props.onChange();
                    }}
                    handleOptionValue={e => {
                        handleOptionValue(e);
                        // props.onChange();
                    }}
                />
            </>
        );
    }
    if (data || props.location.pathname.length > 1) {
        console.log('DURCHRAUSCHEN');
        console.log(myState);
        let defaultProps = getDefaultProps(myState);
        let name = SpaceForUnderScoreAndToLowerCase(defaultProps.searchfordoctor);
        let stadtorpostleitzahl = AllToLowerCase(defaultProps.location);
        let bundesland = AllToLowerCase(defaultProps.bundesland);
        let thema = AllToLowerCase(defaultProps.thema);
        let bezirk = SpaceForUnderScoreAndToLowerCase(defaultProps.bezirk);
        console.log(bezirk);
        console.log(thema);
        console.log(bundesland);
        // console.log(defaultProps.name);
        // FIXME: Push history
        return (
            <TriggerHistoryPush
                pathname={"/search-result" + "-" + "?" + "bundesland=" + bundesland + "&name=" + name + "&thema=" + thema + "&bezirk=" + bezirk + "&stadtorpostleitzahl=" + stadtorpostleitzahl}
            />
        );
    }
}
export default SearchForDoctorForm;


// https://reactrouter.com/web/api/location
// https://reactrouter.com/web/api/Hooks/uselocation
// testing local storage
// https://stackoverflow.com/questions/54647623/how-to-test-localstorage-in-my-react-app
// https://medium.com/javascript-in-plain-english/testing-local-storage-with-testing-library-580f74e8805b
// https://gist.github.com/johno/9b11719c57d14fb4fb144d6c1a84208f

// beim reladen
// props.history.push({
//     pathname: '/register',
//     state: data
// });
import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Fetcha from 'components/fetcha-component';
import Fetch from 'components/search-for-doctor-from/fetch-component'

const Temporary = (props) => {
    console.log(props.history.location.query.stipulation);
    return (
        <>
            <p>Data has been stored</p>
            <h2>{props.history.location.query.headline}</h2>
            <p>{props.history.location.query.stipulation}</p>
            <p>{props.history.location.query.email}</p>
            <p>{props.history.location.query.telefonnumber}</p>
            <p>Form Test</p>
        </>
    );
}

/**
 * headline
 * stipulation
 * email
 * telefonnumber
 */
const FormPsyInfoFuerPraxis = (props) => {
    const myState = {
        headline: "",
        stipulation: "",
        email: "",
        telefonnumber: "",
        isLoaded: false,
        error: null
    }
    const [state, setState] = useState(myState);

    const onAddingHeadline = (event) => {
        setState({
            ...state,
            headline: event.target.value
        });
    }
    const onAddingStipulation = (event) => {
        setState({
            ...state,
            stipulation: event.target.value
        });
    }
    const onAddingEmail = (event) => {

        setState({
            ...state,
            email: event.target.value
        });
    }
    const onAddingTelefonnumber = (event) => {
        console.log('Telefon');
        // handleSubmit();
        // setState({ agbTexarea: event.target.value })
        setState({
            ...state,
            telefonnumber: event.target.value
        });
    }
    const fileSubmit = async (event) => {
        console.log('submit');
        console.log(state);
        // handleSubmit();
        // | POST | api / agbs / agbs
        const url = process.env.REACT_APP_URL + 'api/psyinfo/psyinfo'
        const option = {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({
                "name": state.headline,
                "bundesland": state.agbTexarea,
            })
        }
        fetch(url, option)
            .then(res => {
                return res;
            }).then(res => res.json())
            .then(res => {
                console.log(res);
            }).then(
                (result) => {
                    setState({
                        ...state,
                        isLoaded: true,
                    });
                },
                (error) => {
                    console.log('error');
                    console.log(error);
                    setState({
                        ...state,
                        error: error,
                        isLoaded: true,
                    });
                }
            );
    }
    if (state.error) {

        return <div>{state.error.message}</div>;
    } else if (state.isLoaded) {

        const createdId = "1";
        return (
            <>
                <Redirect to={{
                    pathname: `/agb-store-success/${createdId}`,
                    query: state
                }} />
                <Route path={`/agb-store-success/${createdId}`} component={Temporary} />
            </>
            // TODO: Hier weiter redirect testen
        );
    } else {
        return (
            <Form>
                <FormGroup>
                    <Label for="headline">headline</Label>
                    <Input type="text" name="headline" id="headline" placeholder="Add a headline" onChange={onAddingHeadline} />
                </FormGroup>
                <FormGroup>
                    <Label for="stipulation">Stipulation</Label>
                    <Input type="textarea" name="stipulation" id="stipulation" onChange={onAddingStipulation} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email address</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onAddingEmail}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="telefonnumber">Telefonnummer</Label>
                    <Input type="textarea" name="telefonnumber" id="telefonnumber" onChange={onAddingTelefonnumber} />
                </FormGroup>
                <Button name="submit" onClick={fileSubmit}>Submit</Button>
            </Form>
        );
    }
};
export default FormPsyInfoFuerPraxis;
/**
 * headline
 * stipulation
 * email
 * telefonnumber
 */

import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    ErrorDisplay,
    MySwitchForPrimeUser
} from 'components/conditional-components';


/**
 * headline
 * stipulation
 * email
 * telefonnumber
 */
const FormKontakt = (props) => {
    const myState = {
        headline: "",
        stipulation: "",
        email: "",
        telefonnumber: "",
        isLoaded: false,
        error: null,
        onAddingHeadline: false,
        onAddingStipulation: false,
        onAddingEmail: false,
        onAddingTelefonnumber: false,
        submit: false,
        errors: {
            headline: '',
            stipulation: '',
            subheadline: '',
            email: '',
            telefonnumber: ''
        }
    }
    const [state, setState] = useState(myState);

    const onAddingHeadline = (event) => {
        console.log('HEadline');
        let errors = state.errors;
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        setState({
            ...state,
            headline: event.target.value,
            onAddingHeadline: true,
        });
    }
    const onAddingStipulation = (event) => {
        console.log('Stipulation');
        let errors = state.errors;
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        setState({
            ...state,
            stipulation: event.target.value,
            onAddingStipulation: true
        });
    }
    const onAddingEmail = (event) => {
        console.log('email');
        let errors = state.errors;
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        setState({
            ...state,
            email: event.target.value,
            onAddingEmail: true
        });
    }
    const onAddingTelefonnumber = (event) => {
        console.log('Telefon');
        let errors = state.errors;
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        setState({
            ...state,
            telefonnumber: event.target.value,
            onAddingTelefonnumber: true
        });
    }

    const stateUpdater = (data) => {
        // console.log(data);
        setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            errors[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }
    const validateFormInputBeforSubmission = () => {
        //TODO:https://www.npmjs.com/package/object.entries
        var submitForm = true;
        for (let [key, value] of Object.entries(state)) {
            // console.log(`${key}: ${value}`);
            const keyIncludes = [
                'created_at',
                'updated_at',
                'confirmed',
                'id',
                'onAddingEmail',
                'onAddingHeadline',
                'onAddingTelefonnumber',
                'onAddingStipulation',
                'submit',
                'error',
                'errors',
                'isLoaded'
            ];

            if (keyIncludes.includes(key)) {
            } else {
                console.log(`${key}: ${value}`);
                if (!(value.length > 0)) {
                    console.log('drinnen');
                    console.log(`${key}: ${value.length}`);
                    submitForm = false;
                    stateUpdater(key);
                }
            }
        }
        return submitForm;
    }
    const formValidator = () => {
        console.log('formValidator');
        const { errors } = state;
        console.log(errors);
        var valid = true;
        let formValidation = new RegExp(/^\s*NOT\s*ACCEPTED/g);
        Object.values(errors).forEach((val) => {
            console.log(val);
            formValidation.test(val) && (valid = false);
        });
        return valid;
    }
    const fileSubmit = async (event) => {
        console.log('submit');
        var trueOrNot = validateFormInputBeforSubmission();
        var checkValidation = formValidator();
        console.log(checkValidation);
        if (checkValidation === false || trueOrNot === false) {
            return null;
        }
        setState({
            ...state,
            submit: true
        });

    }
    if (state.onAddingHeadline && state.onAddingStipulation && state.onAddingEmail && state.onAddingTelefonnumber && state.submit) {
        console.log('error');
        // console.log(state.error.message);
        return (
            <div>
                {React.cloneElement(props.children, { data: state })}
            </div>
        );
    } else {
        const { errors } = state;
        return (
            <Form>
                <FormGroup>
                    <Label for="headline">headline</Label>
                    <Input type="text" name="headline" id="headline" placeholder="Add a headline" onChange={onAddingHeadline} />
                </FormGroup>
                <ErrorDisplay error={errors['headline']} />
                <FormGroup>
                    <Label for="stipulation">Stipulation</Label>
                    <Input type="textarea" name="stipulation" id="stipulation" onChange={onAddingStipulation} />
                </FormGroup>
                <ErrorDisplay error={errors['stipulation']} />
                <FormGroup>
                    <Label for="email">Email address</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        onChange={onAddingEmail}
                    />
                </FormGroup>
                <ErrorDisplay error={errors['email']} />
                <FormGroup>
                    <Label for="telefonnumber">Telefonnummer</Label>
                    <Input type="textarea" name="telefonnumber" id="telefonnumber" onChange={onAddingTelefonnumber} />
                </FormGroup>
                <ErrorDisplay error={errors['telefonnumber']} />
                <Button name="submit" onClick={fileSubmit}>Submit</Button>
            </Form>
        );
    }
};
export default FormKontakt;
/**
 * headline
 * stipulation
 * email
 * telefonnumber
 */

import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    ErrorDisplay,
    MySwitchForPrimeUser
} from 'components/conditional-components';


const FormAGB = (props) => {
    const myState = {
        headline: "",
        mediatarifeTexarea: "",
        subheadline: "",
        isLoaded: false,
        onAddingAgbText: false,
        onAddingHeadline: false,
        onAddingSubheadline: false,
        submit: false,
        error: null,
        errors: {
            headline: '',
            mediatarifeTexarea: '',
            subheadline: ''
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
            onAddingHeadline: true
        });
    }
    const onAddingAgbText = (event) => {
        console.log('TExt');
        let errors = state.errors;
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        setState({
            ...state,
            mediatarifeTexarea: event.target.value,
            onAddingAgbText: true
        });
    }
    const onAddingSubheadline = (event) => {
        console.log('TExt');
        let errors = state.errors;
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        setState({
            ...state,
            subheadline: event.target.value,
            onAddingSubheadline: true
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
                'onAddingAgbText',
                'onAddingHeadline',
                'onAddingSubheadline',
                'submit',
                'error',
                'errors',
                'isLoaded'
            ];

            if (keyIncludes.includes(key)) {
                // console.log(key + ' so good data');
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
    if (state.onAddingAgbText && state.onAddingHeadline && state.onAddingSubheadline && state.submit) {
        const createdId = "1";
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
                    <Label for="subheadline">subheadline</Label>
                    <Input type="text" name="subheadline" id="subheadline" placeholder="Add a subheadline" onChange={onAddingSubheadline} />
                </FormGroup>
                <ErrorDisplay error={errors['subheadline']} />
                <FormGroup>
                    <Label for="mediatarifeTexarea">Text Area</Label>
                    <Input type="textarea" name="mediatarifeTexarea" id="mediatarifeTexarea" onChange={onAddingAgbText} />
                </FormGroup>
                <ErrorDisplay error={errors['mediatarifeTexarea']} />
                <Button name="submit" onClick={fileSubmit}>Submit</Button>
            </Form>
        );
    }
};
export default FormAGB;

/**
 * Mediatarife structure:
 * headline, subheadline, text
 */
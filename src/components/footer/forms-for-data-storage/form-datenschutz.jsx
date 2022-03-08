import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    ErrorDisplay,
    MySwitchForPrimeUser
} from 'components/conditional-components';


const Temporary = () => {
    return (
        <p>AGB Test</p>
    );
}


const FormDatenschutz = (props) => {
    const myState = {
        headline: "",
        datenschutzTexarea: "",
        isLoaded: false,
        error: null,
        onAddingText: false,
        onAddingHeadline: false,
        submit: false,
        errors: {
            headline: '',
            datenschutzTexarea: '',
        }
    }
    const [state, setState] = useState(myState);
    const onAddingHeadline = (event) => {
        console.log('HEadline');
        let errors = state.errors;
        console.log('onAddingHeadline');
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        // handleSubmit();
        // setState({ headline: event.target.value })
        setState({
            ...state,
            headline: event.target.value,
            onAddingHeadline: true
        });
    }
    const onAddingText = (event) => {
        console.log('TExt');
        let errors = state.errors;
        console.log('onAddingHeadline');
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        // handleSubmit();
        // setState({ datenschutzTexarea: event.target.value })
        setState({
            ...state,
            datenschutzTexarea: event.target.value,
            onAddingText: true
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
                'onAddingText',
                'onAddingHeadline',
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
    if (state.onAddingText && state.onAddingHeadline && state.submit) {
        console.log('error');
        // console.log(state.error.message);
        return (
            <div>
                {React.cloneElement(props.children, { data: state })}
            </div>
        );
        // return <HOCFooterStoreFetchDatenschutz data={state} />;
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
                    <Label for="datenschutzTexarea">Text Area</Label>
                    <Input type="textarea" name="datenschutzTexarea" id="datenschutzTexarea" onChange={onAddingText} />
                </FormGroup>
                <ErrorDisplay error={errors['datenschutzTexarea']} />
                <Button name="submit" onClick={fileSubmit}>Submit</Button>
            </Form>
        );
    }
};
export default FormDatenschutz;
/**
 * INFO: Headline and textarea is needed. Two fields
 */
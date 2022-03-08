import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
    ErrorDisplay,
    MySwitchForPrimeUser
} from 'components/conditional-components';

const FormAGB = (props) => {
    const myState = {
        headline: "",
        agbTexarea: "",
        isLoaded: false,
        onAddingAgbText: false,
        onAddingHeadline: false,
        submit: false,
        error: null,
        errors: {
            headline: '',
            agbTexarea: '',
        }
    }
    // FIXME:how to fix this
    // https://gist.github.com/heygrady/f9bf3b6dd93fe3d87ba87430fd3c20d5
    // https://stackoverflow.com/questions/39652686/pass-react-component-as-props
    // https://betterprogramming.pub/how-to-pass-components-as-props-4058ea17dff2
    // const HOCFooterStoreFetchAGBChild = props.children;
    // console.log(props.children);
    const [state, setState] = useState(myState);
    const onAddingHeadline = (event) => {
        let errors = state.errors;
        console.log('onAddingHeadline');
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        console.log('HEadline');
        // handleSubmit();
        // setState({ headline: event.target.value })
        setState({
            ...state,
            headline: event.target.value,
            onAddingHeadline: true
        });
    }
    const onAddingAgbText = (event) => {
        let errors = state.errors;
        const { name, value, checked } = event.target;
        MySwitchForPrimeUser(name, errors, value);
        console.log('TExt');
        // handleSubmit();
        // setState({ agbTexarea: event.target.value })
        setState({
            ...state,
            agbTexarea: event.target.value,
            onAddingAgbText: true
        });
    }

    const stateUpdater = (data) => {
        console.log('stateUpdater');
        console.log(data);
        setState(prevState => {
            console.log(prevState);
            let errors = Object.assign({}, prevState.errors);
            errors[data] = 'NOT ACCEPTED: No ' + data + ' added';
            console.log(errors);
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
        var trueOrNot = validateFormInputBeforSubmission();
        var checkValidation = formValidator();
        if (checkValidation === false || trueOrNot === false) {
            return null;
        }

        setState({
            ...state,
            submit: true
        });
    }
    if (state.onAddingAgbText && state.onAddingHeadline && state.submit) {
        const createdId = "1";
        return (
            <>
                {/* how to pass props to props.children: 
                search for this sentense above in text to find links
                */}
                <div>
                    {React.cloneElement(props.children, { data: state })}
                </div>

                {/* how to pass props to props.children: */}
                {/* https://frontarm.com/james-k-nelson/passing-data-props-children/
                https://betterprogramming.pub/passing-data-to-props-children-in-react-5399baea0356
                https://medium.com/@justynazet/passing-props-to-props-children-using-react-cloneelement-and-render-props-pattern-896da70b24f6
                https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children */}
            </>
            // TODO: Hier weiter redirect testen
        );
    } else {
        const { errors } = state;
        console.log(errors);
        return (
            <Form>
                <FormGroup>
                    <Label for="headline">headline</Label>
                    <Input type="text" name="headline" id="headline" placeholder="Add a headline" onChange={onAddingHeadline} />
                </FormGroup>
                <ErrorDisplay error={errors['headline']} />
                <FormGroup>
                    <Label for="agbTexarea">Text Area</Label>
                    <Input type="textarea" name="agbTexarea" id="agbTexarea" onChange={onAddingAgbText} />
                </FormGroup>
                <ErrorDisplay error={errors['agbTexarea']} />
                <Button name="submit" onClick={fileSubmit}>Submit</Button>
            </Form>
        );
    }
};
export default FormAGB;
/**
 * INFO: Headline and textarea is needed. Two fields
 */
import React, { Suspense } from 'react';
import { Button, Form } from 'reactstrap';
import FormElements from 'components/atoms';
import {
    ErrorDisplay,
    MySwitchForPrimeUser
} from 'components/conditional-components';
const HOCFooterUpdateFetchAGB = React.lazy(() => import('components/footer/HOC-footer-update-fetch-agb'));
class UpdateAGBFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.storage = this.props.location.state ? this.props.location.state.data : this.props.items;
        console.log('peckka');
        console.log(props);
        this.state = {
            isLoaded: false,
            data: this.props.location.state ? this.props.location.state.data : this.props.items,
            id: null,
            errors: {
                headline: '',
                agbTexarea: '',
            }
        }
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
    stateUpdater = (data) => {
        // console.log(data);
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            errors[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        }
        );
    }
    validateFormInputBeforSubmission = () => {
        //TODO:https://www.npmjs.com/package/object.entries
        var submitForm = true;
        for (let [key, value] of Object.entries(this.state.data)) {
            // console.log(`${key}: ${value}`);
            const keyIncludes = ['created_at', 'updated_at', 'confirmed', 'id'];
            if (keyIncludes.includes(key)) {
                // console.log(key + 'so good data');
            } else {
                // console.log(`${key}: ${value}`);
                if (!(value.length > 0)) {
                    // console.log('drinnen');
                    // console.log(`${key}: ${value.length}`);
                    submitForm = false;
                    this.stateUpdater(key);
                }
            }
        }
        return submitForm;
    }
    formValidator = () => {
        console.log('formValidator');
        const { errors } = this.state;
        var valid = true;
        let formValidation = new RegExp(/^\s*NOT\s*ACCEPTED/g);
        Object.values(errors).forEach((val) => {
            console.log(val);
            formValidation.test(val) && (valid = false);
        });
        return valid;
    }
    updateAGBs() {
        var trueOrNot = this.validateFormInputBeforSubmission();
        var checkValidation = this.formValidator();
        console.log(checkValidation);
        if (checkValidation === false) {
            console.log('trueOrNot is false: BLOCK');
            return null;
        }

        this.setState({
            isLoaded: true
        });


    }
    updateYourAGBs = (event) => {
        event.preventDefault();
        this.updateAGBs();
    }
    handleValue = (event) => {
        const { name, value, checked } = event.target;
        // console.log(checked);
        // console.log(!1);
        var newValue
        if (name === 'confirmed') {
            newValue = checked;
        } else {
            newValue = value;
        }
        let errors = this.state.errors;
        MySwitchForPrimeUser(name, errors, value);
        // const saveValue = EscapeHtml(value);
        this.setState(prevState => {
            let data = Object.assign({}, prevState.data);
            data[name] = value;
            return { data };
        });
    }
    render() {
        // console.log("RENDER");
        const { data, isLoaded, errors } = this.state;
        // console.log(data);
        if (isLoaded) {
            return (
                <div>
                    <Suspense fallback={<div>Loading...</div>}>
                        {/* <UpdateAGBQuerrieComponent id={data.id} /> */}
                        <HOCFooterUpdateFetchAGB data={data} />
                    </Suspense>
                </div>
            );

        } else {

            var keys = Object.keys || require('object-keys');
            const myState = this.state;
            const arrayOfkeyOfState = keys(this.state.data);

            return (<Form>{arrayOfkeyOfState.map((data, index) => {

                if (data === 'created_at' || data === 'updated_at' || data === 'id') {
                    return null;
                } else {
                    console.log(errors[data]);
                    console.log(data);
                    return (
                        <React.Fragment key={data}>
                            <FormElements
                                key={data}
                                formbezeichnung={data}
                                text={'text'}
                                name={data}
                                value={this.state.data[data]}
                                handleChangeInputValue={this.handleValue}
                            />
                            {/* TODO:Errors need to be passed down */}
                            <ErrorDisplay key={data + '_error'} error={errors[data]} />
                        </React.Fragment>
                    );
                }
            })}
                <Button onClick={this.updateYourAGBs}>{'Update your AGBs'}</Button>
            </Form>
            );
        }
    }
}
export default UpdateAGBFormComponent;
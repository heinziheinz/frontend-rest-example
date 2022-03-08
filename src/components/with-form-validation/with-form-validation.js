import React from 'react';
import {
    EscapeHtml,
} from 'components/regex-collection';
import { MySwitchForPrimeUser } from 'components/conditional-components';
// { signal: this.mySignal }
export default function withFormValidation(WrappedComponent) {
    class formValidation extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                collapse: false,
                status: 'Closed',
                signupMeassage: '',
                isFormSubmissionAllowed: true,
                errors: {
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                    submissionAllowed: ''
                }
            };
        }


        componentDidMount() {
            console.log(this.props.inputFields)
        }
        //TODO dynamically cerate state. arrays must ne props passed down.

        componentWillUnmount() {

        }
        componentDidUpdate() {
            //this.myController.abort();
        }
        formValidator = () => {
            const { errors } = this.state;
            var valid = true;
            let formValidation = new RegExp(/^\s*NOT\s*ACCEPTED/g);
            Object.values(errors).forEach((val) => {
                console.log(val);
                formValidation.test(val) && (valid = false);
            });
            return valid;
        }
        stateUpdater = (data) => {
            this.setState(prevState => {
                let errors = Object.assign({}, prevState.errors);
                errors[data] = 'NOT ACCEPTED: No ' + data + ' added';
                return { errors };
            });
        }
        toggle = () => {
            console.log('has been clicked');
            this.props.toggle();
        }

        handleSubmit = (event) => {
            console.log('is fucking fallllll');
            //TODO funktioniert das mit arges so??
            const { name, email, password, passwordConfirmation } = this.state;
            var submitForm = true;
            //TODO this conditions won`t work for loginform: maybe a loop wound help
            if (!(email.length > 0)) {
                console.log('email.length');
                submitForm = false;
                this.stateUpdater('email');
            }
            if (!(password.length > 0)) {
                console.log('password.length ');
                submitForm = false;
                this.stateUpdater('password');
            }
            if (this.props.thisIsSingUpForm === true) {
                if (!(name.length > 0)) {
                    console.log('name.length');
                    submitForm = false;
                    this.stateUpdater('name');
                }
                if (!(passwordConfirmation.length > 0)) {
                    console.log('passwordConfirmation.length ');
                    submitForm = false;
                    this.stateUpdater('passwordConfirmation');
                }
            }
            if (submitForm === true) {
                //TODO vielleicht gehört hier auch ein await hin
                var checkValidation = this.formValidator();
                if (checkValidation === false) {
                    // this.stateUpdater('submissionAllowed');
                    //und dadurch permanent submit blockiert
                    // return null;
                    submitForm = false;
                }
            }

            if (submitForm === false) {
                return new Promise(resolve => {
                    this.setState({
                        isFormSubmissionAllowed: false
                    }, () => {
                        resolve();
                    })
                });
            } else {
                return new Promise(resolve => {
                    this.setState({
                        isFormSubmissionAllowed: true
                    }, () => {
                        resolve();
                    })
                });
            }

        }
        PasswordConfirmation = () => {
            const { password, passwordConfirmation } = this.state;
            if (passwordConfirmation.length > 0) {
                if (passwordConfirmation === password) {
                    this.setState(prevState => {
                        let errors = Object.assign({}, prevState.errors);
                        errors.passwordConfirmation = 'password Confirmation correct';
                        return { errors };
                    });
                } if (passwordConfirmation !== password) {
                    this.setState(prevState => {
                        let errors = Object.assign({}, prevState.errors);
                        errors.passwordConfirmation = 'NOT ACCEPTED: password Confirmation incorrect';
                        return { errors };
                    });

                } else {
                    return null;
                }
            }
            return '';
        }

        handleInputChange = (event) => {
            //TODO addapted to computed keys: keep on handler and delete others
            //TODO change name of handleInputChange
            const { name, value } = event.target;
            console.log(value);
            const { password, passwordConfirmation } = this.state;
            let errors = this.state.errors;
            MySwitchForPrimeUser(name, errors, value);
            // const newValue = EscapeHtml(value);
            this.setState({ [name]: value },
                () => {
                    this.PasswordConfirmation();
                }
            );
        }


        render() {
            console.log(this.props.toggle);
            console.log(this.props.loginCollapse);
            const { name, email, password, passwordConfirmation, isFormSubmissionAllowed } = this.state;

            return (
                <WrappedComponent
                    loginRadioButtonState={this.props.loginRadioButtonState}
                    loginCollapse={this.props.loginCollapse}
                    handleInputChange={this.handleInputChange}
                    errors={this.state.errors}
                    handleSubmit={this.handleSubmit}
                    toggle={this.toggle}
                    name={name}
                    email={email}
                    password={password}
                    passwordConfirmation={passwordConfirmation}
                    isFormSubmissionAllowed={isFormSubmissionAllowed}
                />
            );

        }
    }
    formValidation.displayName = `formValidation(${getDisplayName(WrappedComponent)})`;
    return formValidation;
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
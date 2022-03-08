import React from 'react';
import Cookies from 'js-cookie';
import { Button, Form, FormGroup, Label, Input, Collapse, CardBody, Card } from 'reactstrap';
import {
    Route,
    Redirect
} from "react-router-dom";
import {//TODO wo und wie die drei regex eingebunden werden
    EscapeHtml,
} from 'components/regex-collection';
import { MySwitchForPrimeUser } from 'components/conditional-components';

//TODO externalisieren
const CompleteFormValidator = (name, email, password, passwordConfirmation, errors) => {
    //1. Sind alle Felder ausgefüllt 2. Sind password und passwordConfirm gleich
    //3. Sind irgedwelche Felder die NOT ACCEPTED haben vorhanden.
    let myArray = [name, email, password, passwordConfirmation];
    if (!(name.length > 0)) {
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            errors.name = 'NOT ACCEPTED: No name added';
            return { errors };
        });
        return null;
    }
    return null;
}


export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            collapse: false,
            status: 'Closed',
            signupMeassage: '',
            errors: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                submissionAllowed: ''
            }
        };
    }
    upperToggle = () => {
        this.props.toggle();
    }
    componentDidMount() {

    }
    componentWillUnmount() {

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
        console.log(data);
        this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);
            errors[data] = 'NOT ACCEPTED: No ' + data + ' added';
            return { errors };
        });
    }

    handleSubmit = (event) => {
        //prventDefault ist essentiell, sonst funktioniert das nicht!
        event.preventDefault();
        const { name, email, password, passwordConfirmation } = this.state;
        const sanitized_Name = EscapeHtml(name);
        const sanitized_Email = EscapeHtml(email);
        var submitForm = true;
        if (!(name.length > 0)) {
            var submitForm = false;
            this.stateUpdater('name');
        }
        if (!(email.length > 0)) {
            var submitForm = false;
            this.stateUpdater('email');
        }
        if (!(password.length > 0)) {
            var submitForm = false;
            this.stateUpdater('password');
        }
        if (!(passwordConfirmation.length > 0)) {
            var submitForm = false;
            this.stateUpdater('passwordConfirmation');
        }
        if ((password.length > 0) && (email.length > 0) && (name.length > 0) && (passwordConfirmation.length > 0)) {
            var checkValidation = this.formValidator();
            if (checkValidation === false) {
                this.stateUpdater('submissionAllowed');
                return null;
            }
        }
        if (!submitForm) {
            this.stateUpdater('submissionAllowed');
            return null;
        }

        const request = new Request(process.env.REACT_APP_URL + "api/auth/signup", {
            method: 'POST',
            body: JSON.stringify({
                "name": sanitized_Name,
                "email": sanitized_Email,
                "password": password,
                "password_confirmation": passwordConfirmation
            }),
            headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
        }
        );
        fetch(request)
            .then(res => {
                if (res.status === 201) {
                    this.setState({
                        signupMeassage: 'Your Account has been created. Check your email account to activate!'
                    });
                }
                if (res.status === 422) {
                    this.setState({
                        signupMeassage: 'This email has already been taken!'
                    });
                }
                Cookies.set('signupaction', true, { secure: true });
                return res;
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        names: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

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
        const { password, passwordConfirmation } = this.state;
        let errors = this.state.errors;
        MySwitchForPrimeUser(name, errors, value);
        // const newValue = EscapeHtml(value);
        this.setState({ [name]: value },
            () => {
                this.PasswordConfirmation();
            }
        );


        //https://stackoverflow.com/questions/44215348/setstate-being-called-too-late
        // https://medium.com/better-programming/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c
    }

    render() {
        const { signupMeassage, errors, password, passwordConfirmation } = this.state;
        console.log(errors);
        if (Cookies.get('signupaction') === 'true') {
            return (
                <React.Fragment>
                    <Redirect to={{
                        pathname: "/signup-site-confirmation",
                        state: { signupMeassage: signupMeassage }
                    }}
                    />
                </React.Fragment>
            );
        }
        return (
            <div>
                <input
                    type="radio"
                    id="signup"
                    onClick={() => { this.upperToggle(); }}
                    style={{ marginBottom: '1rem' }}
                    checked={this.props.signupRadioButtonState}
                />
                <h5>Current state: {this.state.status}</h5>
                <Collapse
                    isOpen={this.props.signupCollapse}
                    onEntering={this.onEntering}
                    onEntered={this.onEntered}
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                >
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label>
                                        name:
            <Input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {errors.name.length > 0 &&
                                        <span>{errors.name}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        email:
            <Input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {errors.email.length > 0 &&
                                        <span>{errors.email}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        password:
            <Input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {errors.password.length > 0 &&
                                        <span>{errors.password}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        password_confirmation:
            <Input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {errors.passwordConfirmation.length > 0 && <span>{errors.passwordConfirmation}</span>}
                                </FormGroup>
                                <FormGroup check row>
                                    <Button>Submit</Button>
                                    {errors.submissionAllowed.length > 0 && <span>{errors.submissionAllowed}</span>}
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );

    }
}
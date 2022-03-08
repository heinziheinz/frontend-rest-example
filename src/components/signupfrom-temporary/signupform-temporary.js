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
import { Helmet } from "react-helmet";
const AbortController = window.AbortController;


export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myController = new AbortController();
        this.mySignal = this.myController.signal;
        this.state = {
            error: null,
            isLoaded: false,
            collapse: false,
            status: 'Closed',
            signupMeassage: ''
        };
    }
    upperToggle = () => {
        this.props.toggle();
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        this.myController.abort();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await this.props.handleSubmit();
        console.log(this.props.isFormSubmissionAllowed);
        if (this.props.isFormSubmissionAllowed === false) {
            return null;
        }
        //TODO hier await verwenden, um auf anwort zu warten: true oder false
        const sanitized_Name = EscapeHtml(this.props.name);
        const sanitized_Email = EscapeHtml(this.props.email);



        const request = new Request(process.env.REACT_APP_URL + "api/auth/signup", {
            method: 'POST',
            body: JSON.stringify({
                "name": sanitized_Name,
                "email": sanitized_Email,
                "password": this.props.password,
                "password_confirmation": this.props.passwordConfirmation
            }),
            headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
        }
        );
        fetch(request, { signal: this.mySignal })
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

    handleInputChange = (event) => {
        this.props.handleInputChange(event);
    }

    render() {
        const { signupMeassage, password, passwordConfirmation } = this.state;

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
                {/* <Helmet>
                    <title>Psyinfosearch | signupform</title>
                    <meta name="description"
                        content="Die Webseite spezialisiert auf die Suche nach Psychologen & psychologische Hilfe." />
                    <link rel="canonical" href={process.env.REACT_APP_URL} />
                    <meta name="prerender-status-code" content="404" />
                </Helmet> */}
                <input
                    type="radio"
                    id="signup"
                    onClick={() => { this.upperToggle(); }}
                    style={{ marginBottom: '1rem' }}
                    checked={this.props.loginRadioButtonState}
                />
                <h5>Current state: {this.state.status}</h5>
                <Collapse
                    isOpen={this.props.loginCollapse}
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
                                        <Input type="text" name="name" value={this.props.name} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {this.props.errors.name.length > 0 &&
                                        <span>{this.props.errors.name}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        email:
                                        <Input type="email" name="email" value={this.props.email} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {this.props.errors.email.length > 0 &&
                                        <span>{this.props.errors.email}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        password:
                                        <Input type="password" name="password" value={this.props.password} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {this.props.errors.password.length > 0 &&
                                        <span>{this.props.errors.password}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        password_confirmation:
                                        <Input type="password" name="passwordConfirmation" value={this.props.passwordConfirmation} onChange={this.handleInputChange} noValidate />
                                    </Label>
                                    {this.props.errors.passwordConfirmation.length > 0 && <span>{this.props.errors.passwordConfirmation}</span>}
                                </FormGroup>
                                <FormGroup check row>
                                    <Button>Submit</Button>
                                    {this.props.errors.submissionAllowed.length > 0 && <span>{this.props.errors.submissionAllowed}</span>}
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );

    }
}
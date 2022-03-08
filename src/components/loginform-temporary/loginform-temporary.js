import React from 'react';
import { Button, Form, FormGroup, Label, Input, Collapse, CardBody, Card, Alert } from 'reactstrap';
import {
    Route,
    Redirect
} from "react-router-dom";
import Cookies from 'js-cookie';
import ResetPasword from 'components/reset-password-start';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
// const ResetPasword  = React.lazy(() => import('components/reset-password-start'));
const AbortController = window.AbortController;
export default class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.myController = new AbortController();
        this.mySignal = this.myController.signal;
        this.state =
        {
            error: null,
            isLoaded: false,
            items: [],
            collapse: false,
            password: true
        };
    }


    upperToggle = () => {
        // console.log(this.props.toggle);
        this.props.toggle();
    }


    componentDidMount() {
        // console.log('HAs neen lllLLLLLL');
    }
    componentWillUnmount() {
        this.myController.abort();
    }
    handleInputChange = (event) => {
        this.props.handleInputChange(event);
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        await this.props.handleSubmit();
        console.log(this.props.isFormSubmissionAllowed);
        if (this.props.isFormSubmissionAllowed === false) {
            return null;
        }
        const email = this.props.email;
        const password = this.props.password;

        //TODO hier await verwenden, um auf anwort zu warten: true oder false
        const request = new Request(process.env.REACT_APP_URL + "api/auth/login", {
            //TODO abort Controller hinzufügen und IE
            credentials: 'include',
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
            headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
        }
        );
        fetch(request, { signal: this.mySignal })
            .then(res => {
                // console.log(res);//wird im falle eines Fehlers nicht aktiviert
                if (res.ok) {
                    if (res.status === 200) {
                        console.log('status 200');
                    }
                    if (res.status === 422) {
                        console.log('invalid credentials');
                    }
                }
                return res;
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                console.log(Cookies.get('signedin'));
                //a cookie is set
                //Boolean is returned as a string
                // Cookie expires after 30 minutes. That`s too short.
                if (res.success) {
                    var in30Minutes = 1 / 48;
                    Cookies.set('signedin', true, {
                        expires: in30Minutes,
                        secure: true
                    });
                }

                if (res.error) {
                    console.log(res.error);
                    this.setState({
                        password: false
                    });
                }
                console.log(Cookies.get('signedin'));
                return res;
            })
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        names: result
                    });
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    render() {
        console.log(this.props.email);
        const { password } = this.state;
        if (Cookies.get('signedin') === 'true') {
            console.log('hi, I`ve set a cookie');
            return (
                <React.Fragment>
                    {/* <Redirect to="/logged-in" /> */}
                    <Redirect to={{
                        pathname: "/logged-in",
                        state: { message: 'message' }
                    }} />
                </React.Fragment>
            );
        }
        // if (Cookies.get('invalidCredentials') === 'true') {
        //     console.log('hi, I`ve set a cookie');
        //     return (
        //         <React.Fragment>
        //             <h3>Passord</h3>
        //         </React.Fragment>
        //     );
        // }
        return (
            <div>
                <Helmet>
                    <title>Psyinfosearch | loginform</title>
                    <meta name="description"
                        content="Die Webseite spezialisiert auf die Suche nach Psychologen & psychologische Hilfe." />
                    <link rel="canonical" href={process.env.REACT_APP_URL} />
                    <meta name="prerender-status-code" content="404" />
                </Helmet>
                <input
                    type="radio"
                    id="login"
                    onClick={() => { this.upperToggle(); }}
                    style={{ marginBottom: '1rem' }}
                    // ref={this.props.radioButtonRef}
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
                                        email:
                                        <Input type="email" name="email" placeholder="email" value={this.props.email} onChange={this.handleInputChange} />
                                    </Label>
                                    {this.props.errors.email.length > 0 &&
                                        <span>{this.props.errors.email}</span>}
                                </FormGroup>
                                <FormGroup>
                                    <Label
                                        style={{
                                            "marginBottom": "0"
                                        }}>
                                        password:
                                        <Input type="password" name="password" placeholder="dein passwort" value={this.props.password} onChange={this.handleInputChange} />
                                    </Label><br></br>
                                    {password === false ? <Alert style={{ "width": "300px" }}
                                        color="danger">Your password or email address is wrong!</Alert> : ""}
                                    <Link to="/reset-password" >Forgotten your password?</Link><br></br>
                                    {this.props.errors.password.length > 0 &&
                                        <span>{this.props.errors.password}</span>}
                                </FormGroup>
                                <FormGroup check row>
                                    <Button>Submit</Button>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}



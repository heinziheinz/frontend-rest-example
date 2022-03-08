import React from 'react';
// import SignupForm from './../signupfrom';
// import LoginForm from './../loginform';
import SignupForm from '../HOC-signupfrom/HOC-signupfrom';//temporarily substituting './../signupfrom';
import LoginForm from './../HOC-loginform';//temportarily substituting './../loginform'
import { Helmet } from "react-helmet";

export default class SignUpLoginLogout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginRadioButtonState: false,
            signupRadioButtonState: false
        };
        this.signupToggle = this.signupToggle.bind(this);
        this.loginToggle = this.loginToggle.bind(this);
    }
    componentDidMount() {
    }
    loginToggle() {
        console.log('has been clickd HOC and ....');
        this.setState(state => ({ signupRadioButtonState: false }));
        this.setState(state => ({ loginRadioButtonState: !state.loginRadioButtonState }));
    }
    signupToggle() {
        this.setState(state => ({ loginRadioButtonState: false }));
        this.setState(state => ({ signupRadioButtonState: !state.signupRadioButtonState }));
    }

    render() {
        const {
            loginRadioButtonState,
            signupRadioButtonState
        } = this.state;
        console.log(loginRadioButtonState);
        console.log('Login and ans sogn out');
        return (
            <React.Fragment>
                <Helmet>
                    <title>Psyinfosearch | Login</title>
                    <meta name="description"
                        content="Die Webseite spezialisiert auf die Suche nach Psychologen & psychologische Hilfe." />
                    {/* <meta name="prerender-status-code" content="404" /> */}
                    <link rel="canonical" href={process.env.REACT_APP_URL} />
                </Helmet>
                <LoginForm
                    toggle={this.loginToggle}
                    loginRadioButtonState={loginRadioButtonState}
                    loginCollapse={loginRadioButtonState}
                />
                <SignupForm
                    toggle={this.signupToggle}
                    signupRadioButtonState={signupRadioButtonState}
                    signupCollapse={signupRadioButtonState}
                />
            </React.Fragment>
        );
    }
}


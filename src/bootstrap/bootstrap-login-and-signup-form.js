import React from 'react';
import SignupForm from './bootstrap-signup-form';
import LoginForm from './bootstrap-login-form';
// import LoginFrom from './../components/loginform';

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
        return (
            <React.Fragment>
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


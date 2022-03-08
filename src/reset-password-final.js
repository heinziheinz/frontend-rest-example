import React from 'react';
import {
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Cookies from 'js-cookie';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      email: '',
      password: '',
      passwordConfirmation: '',
      token: this.props.token,
      resetState: false,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
  }

  componentDidMount() {

    //  this.handleSubmit();
  }
  handleSubmit(event) {
    //prventDefault ist essentiell, sonst funktioniert das nicht!
    event.preventDefault();
    const { name, email, password, passwordConfirmation } = this.state;
    const request = new Request(process.env.REACT_APP_URL + "api/password/reset", {
      method: 'POST',
      body: JSON.stringify({
        "email": email,
        "password": password,
        "password_confirmation": passwordConfirmation,
        "token": this.state.token,
      }),
      headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
    }
    );
    fetch(request)
      .then(res => {

        if (res.status === 200) {
          this.setState({
            message: 'Your password has been reset'
          });
        } else {
          this.setState({ message: 'Something went wrong' });
        }
        return res;
      })
      .then(res => res.json())
      .then(
        (result) => {
          Cookies.remove('findResetPassword', { secure: true });
          Cookies.set('finalMessage', true, { secure: true });
          this.setState({
            isLoaded: true,
            names: result,
            resetState: true
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
  handleEmailChange(event) {
    this.setState({ email: event.target.value });

  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });

  }
  handlePasswordConfirmationChange(event) {
    this.setState({ passwordConfirmation: event.target.value });

  }

  render() {
    const { resetState, message } = this.state;

    if (!resetState) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            email:
            <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <label>
            password:
            <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <label>
            password_confirmation:
            <input type="password" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmationChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    if (resetState) {
      return (
        <Redirect
          to={{
            pathname: "/reset-password-final-message",
            state: { message: message }
          }}
        />
      );
    }
  }
}


function AppRouter(props) {
  Cookies.remove('findResetPassword', { secure: true });

  //so this path only can be entered, when
  //password-reset-find-token has added that cookie
  const token = props.location.state.myResetTokenId;
  return (
    <PasswordReset token={token} />
  );
}

export default AppRouter;
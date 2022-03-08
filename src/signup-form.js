import React from 'react';
import Cookies from 'js-cookie';
import {
  Route,
  Redirect
} from "react-router-dom";

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
      passwordConfirmation: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
  }

  componentDidMount() {

  }
  handleSubmit(event) {
    //prventDefault ist essentiell, sonst funktioniert das nicht!
    event.preventDefault();
    const { name, email, password, passwordConfirmation } = this.state;
    const request = new Request("/api/auth/signup", {
      method: 'POST',
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password,
        "password_confirmation": passwordConfirmation
      }),
      headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
    }
    );
    fetch(request)
      .then(res => res.json())
      .then(res => {
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
  handleNameChange(event) {
    this.setState({ name: event.target.value });
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
    if (Cookies.get('signedin') === 'true') {
      return (
        <React.Fragment>
          <Route path="/protected" exact component={Protected} />
          <Redirect to="protected" />
        </React.Fragment>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
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
}

function Protected() {
  return <h3>Protected</h3>;
}
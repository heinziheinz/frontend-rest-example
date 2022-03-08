
import React from 'react';
import Cookies from 'js-cookie';
import LogoutButton from './logout-button';
import {
  Route,
  Redirect
} from "react-router-dom";

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      password: '',
      error: null,
      isLoaded: false,
      items: [],
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.anotherHandleChange = this.anotherHandleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }
  anotherHandleChange(event) {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }
  componentDidMount() {

  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    // "email":"holla@gmx.at",
    // "password":"holla",

    //   this.setState({redirectToReferrer: true});
    const request = new Request(process.env.REACT_APP_URL + "/api/auth/login", {
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
    fetch(request)
      .then(res => {
        console.log(res);//wird im falle eines Fehlers nicht aktiviert
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
        console.log(Cookies.get('signedin'));
        return res;
      })
      .then(
        (result) => {
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
    // const redirectToReferrer = this.state.redirectToReferrer;
    if (Cookies.get('signedin') === 'true') {
      return (
        <React.Fragment>
          <Route path="/protected" exact component={Protected} />
          <Redirect to="/protected" />
        </React.Fragment>
      );
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          email:
          <input type="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          password:
          <input type="password" value={this.state.password} onChange={this.anotherHandleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function Protected() {
  return (
    <React.Fragment>
      <h3>Protected</h3>
      <LogoutButton />
    </React.Fragment>
  );
}


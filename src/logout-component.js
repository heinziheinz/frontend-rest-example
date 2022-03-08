
import React from 'react';
import Cookies from 'js-cookie';
import {
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

    this.signoutHandler = this.signoutHandler.bind(this);
  }
  componentDidMount() {
  }

  signoutHandler(event) {
    console.log('logout has been clicked');
    event.preventDefault();
    const request = new Request(process.env.REACT_APP_URL + "/api/auth/logout", {
      credentials: 'include',
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
    }
    );
    fetch(request)
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => res.json())
      .then(
        (result) => {
          Cookies.set('signedin', false, { secure: true });
          Cookies.set('logged-out', true, { secure: true });
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

  render() {
    const { error, isLoaded } = this.state;

    if (Cookies.get('signedin') === 'true') {
      return (
        <button onClick={this.signoutHandler}>Sign out</button>
      );
    }
    if (Cookies.get('signedin') === 'false') {

      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Logging out...</div>;
      } else {
        return (
          <Redirect to="/logged-out" />
        );
      }


    }//ende if cookie
  }//ende render
}


import React from 'react';
import Cookies from 'js-cookie';

export default class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const request = new Request(process.env.REACT_APP_URL + "/api/auth/login", {
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        "email": "holla@gmx.at",
        "password": "holla",
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
        //a cookie is set
        //Boolean is returned as a string
        // Cookie expires after 30 minutes. That`s too short.
        if (res.success) {
          var in30Minutes = 1 / 48;
          Cookies.set('signedin', true, {
            expires: in30Minutes,
            secure: true
          });
          // https://stackoverflow.com/questions/58232708/js-cookie-samesite-and-httponly
        }
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
    const { error, isLoaded, names } = this.state;
    //console.log(names);
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(names);
      return (
        <h1>Login</h1>
      );
    }
  }
}
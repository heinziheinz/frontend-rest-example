import React from 'react';

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
    const request = new Request("/api/auth/signup", {
      method: 'POST',
      body: JSON.stringify({
        "name": "pusha",
        "email": "pusha@gmx.at",
        "password": "pusha",
        "password_confirmation": "pusha"
      }),
      headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
    }
    );
    fetch(request)
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

  render() {
    const { error, isLoaded, names } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <h1>signup</h1>
      );
    }
  }
}
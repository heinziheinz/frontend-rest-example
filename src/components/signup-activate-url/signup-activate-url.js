import React from "react";
import {
  Route,
  Redirect
} from "react-router-dom";

class Check extends React.Component {
  constructor(props) {
    console.log(props.match.params.userId);
    super(props);
    this.state =
    {
      password: '',
      error: null,
      isLoaded: false,
      items: [],
      email: '',
      myUserId: this.props.match.params.userId
    };
  }
  componentDidMount() {
    console.log('Check Component did mount' + this.state.myUserId);
    console.log(process.env.REACT_APP_URL);
    console.log("seeeooooo");
    const request = new Request(process.env.REACT_APP_URL + "api/auth/signup/activate/" + this.state.myUserId, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
    }
    );
    fetch(request)
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
      )//end of promise
  }
  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Redirect to="/login" />
      );
    }
  }
}

function AppRouter() {
  // console.log('holllllllo');
  return (
    <React.Fragment>
      <Route path="/api/auth/signup/activate/:userId" component={Check} />
    </React.Fragment>
  );
}

export default AppRouter;



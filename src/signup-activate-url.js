import React from "react";
import {
  Route,
  Redirect
} from "react-router-dom";

class Check extends React.Component {
  constructor(props) {

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


    const request = new Request("/api/auth/signup/activate/" + this.state.myUserId, {
      method: 'GET',
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
  return (
    <React.Fragment>
      <Route path="/api/auth/signup/activate/:userId" component={Check} />
    </React.Fragment>
  );
}

export default AppRouter;



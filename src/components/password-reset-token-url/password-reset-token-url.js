import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

class Check extends React.Component {
  constructor(props) {
    console.log(props.match.params.resettokenId);
    super(props);
    this.state =
    {
      password: '',
      error: null,
      isLoaded: false,
      items: [],
      email: '',
      myResetTokenId: this.props.match.params.resettokenId
    };
  }
  componentDidMount() {
    console.log('Check Component did mount' + this.state.myResetTokenId);

    const request = new Request(process.env.REACT_APP_URL + "api/password/find/" + this.state.myResetTokenId, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
    }
    );
    fetch(request)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(
        (result) => {
          Cookies.set('findResetPassword', true, { secure: true });
          this.setState({
            isLoaded: true,
            items: result
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
    const { error, isLoaded, items, myResetTokenId } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(items);
      return (
        //  <ResetPasswordFinal res={items}/>
        <Redirect
          to={{
            pathname: "/reset-password-final",
            state: { myResetTokenId: myResetTokenId }
          }}
        />
      );
    }
  }
}

function AppRouter() {
  return (
    <React.Fragment>
      <Route path="/api/password/find/:resettokenId" component={Check} />
    </React.Fragment>
  );
}

export default AppRouter;

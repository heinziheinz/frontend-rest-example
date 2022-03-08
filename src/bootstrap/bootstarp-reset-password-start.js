
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      error: null,
      isLoaded: false,
      items: [],
      email: '',
      message: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }
  componentDidMount() {
    Cookies.set('reset-password', false, { secure: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email } = this.state;

    const request = new Request(process.env.REACT_APP_URL + "api/password/create", {
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        "email": email,
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
            Cookies.set('reset-password', true, { secure: true });
            this.setState({ message: 'Your email Address is correct.We`ve sent you ann email with varification link!' })
          }
          if (res.status === 422) {
            console.log('invalid credentials');
            Cookies.set('reset-password', true, { secure: true });
            this.setState({ message: 'Your email Address is incorrect. Enter correct emailaddres.' })
          }
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);

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
    const { message, isLoaded, error } = this.state;
    console.log(message + 'yohhh');

    if (Cookies.get('reset-password') === 'false' || typeof Cookies.get('reset-password') === 'undefined') {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">email for password reset:</Label>
            <Input type="email" id="email" name="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>
          <Button>Reset Password</Button>
        </Form>
      );
    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...lslslsl</div>;
    } else {

      if (Cookies.get('reset-password') === 'true') {
        return (
          <Redirect to={{
            pathname: "/reset-notification",
            state: { message: message }
          }} />
        );
      } else {
        return <h1>Cookie Problem</h1>
      }
    }//ee
  }
}







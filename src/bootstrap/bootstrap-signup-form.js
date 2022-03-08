import React from 'react';
import Cookies from 'js-cookie';
import { Button, Form, FormGroup, Label, Input, Collapse, CardBody, Card } from 'reactstrap';
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
      passwordConfirmation: '',
      collapse: false,
      status: 'Closed',
      signupMeassage: ''
    };
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.upperToggle = this.upperToggle.bind(this);
    // this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
  }

  onEntering() {
    this.setState({ status: 'Opening...' });
  }

  onEntered() {
    this.setState({ status: 'Opened' });
  }

  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }
  upperToggle() {
    this.props.toggle();
  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
  handleSubmit(event) {
    //prventDefault ist essentiell, sonst funktioniert das nicht!
    event.preventDefault();
    const { name, email, password, passwordConfirmation } = this.state;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(passwordConfirmation);
    console.log('lllll');
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
      .then(res => {
        console.log(res.status);
        if (res.status === 201) {
          this.setState({
            signupMeassage: 'Your Account has been created. Check your email account to activate!'
          });
        }
        if (res.status === 422) {
          this.setState({
            signupMeassage: 'This email has already been taken!'
          });
        }
        Cookies.set('signupaction', true, { secure: true });
        return res;
      })
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
      )

  }
  handleNameChange(event) {
    this.setState({ name: event.target.value });
    console.log(this.state.name);
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  }
  handlePasswordConfirmationChange(event) {
    this.setState({ passwordConfirmation: event.target.value });
    console.log(this.state.passwordConfirmation);
  }

  render() {
    const { signupMeassage } = this.state;
    //this.props.location.state.signupMeassage
    if (Cookies.get('signupaction') === 'true') {
      return (
        <React.Fragment>
          <Redirect to={{
            pathname: "/signup-site",
            state: { signupMeassage: signupMeassage }
          }}
          />
        </React.Fragment>
      );
    }
    return (
      <div>
        <input
          type="radio"
          id="signup"
          onClick={() => { this.upperToggle(); }}
          style={{ marginBottom: '1rem' }}
          checked={this.props.signupRadioButtonState}
        />
        <h5>Current state: {this.state.status}</h5>
        <Collapse
          isOpen={this.props.signupCollapse}
          onEntering={this.onEntering}
          onEntered={this.onEntered}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <Card>
            <CardBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>
                    name:
            <Input type="text" value={this.state.name} onChange={this.handleNameChange} />
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    email:
            <Input type="email" value={this.state.email} onChange={this.handleEmailChange} />
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    password:
            <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    password_confirmation:
            <Input type="password" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmationChange} />
                  </Label>
                </FormGroup>
                <FormGroup check row>
                  <Button>Submit</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );

  }
}


import React from 'react';
import { Button, Form, FormGroup, Label, Input, Collapse, CardBody, Card } from 'reactstrap';
import {
  Route,
  Redirect
} from "react-router-dom";
import Cookies from 'js-cookie';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      password: '',
      error: null,
      isLoaded: false,
      items: [],
      email: '',
      collapse: false,
      status: 'Closed'
    };
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.upperToggle = this.upperToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.anotherHandleChange = this.anotherHandleChange.bind(this);
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
  componentWillUnmount() {
    //TODO  this.myController.abort plus stumpf für IE
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;

    const request = new Request(process.env.REACT_APP_URL + "api/auth/login", {
      //TODO abort Controller hinzufügen und IE
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
        console.log(Cookies.get('signedin'));
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
    if (Cookies.get('signedin') === 'true') {
      return (
        <React.Fragment>
          <Redirect to="/logged-in" />
        </React.Fragment>
      );
    }
    return (
      <div>
        <input
          type="radio"
          id="login"
          onClick={() => { this.upperToggle(); }}
          style={{ marginBottom: '1rem' }}
          // ref={this.props.radioButtonRef}
          checked={this.props.loginRadioButtonState}
        />
        <h5>Current state: {this.state.status}</h5>
        <Collapse
          isOpen={this.props.loginCollapse}
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
                    email:
                    <Input type="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label>
                    password:
                    <Input type="password" placeholder="dein passwort" value={this.state.password} onChange={this.anotherHandleChange} />
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



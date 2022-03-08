
import React from 'react';


export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      error: null,
      isLoaded: false,
      items: [],
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ email: event.target.value });

  }
  componentDidMount() {

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

        if (res.ok) {
          if (res.status === 200) {

          }
          if (res.status === 422) {

          }
        }
        return res;
      })
      .then(res => res.json())
      .then(res => {


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

          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  render() {
    // const redirectToReferrer = this.state.redirectToReferrer;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            email for password reset:
            <input type="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}





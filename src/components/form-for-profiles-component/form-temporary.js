import React, { Component } from 'react';
import { Test } from 'components/regex-collection';

const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    //FIXME Object.values is not supported by IE
    //https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Object/values
    // FIXME useragen in safari funktioniert nicht 
    // http://www.useragentstring.com/index.php?id=19355
    Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: null,
            email: null,
            password: null,
            errors: {
                fullName: '',
                email: '',
                password: '',
            }
        };
    }

    componentDidMount = () => {
        console.log('componentdidmount');
        const myState = this.state;
        const keysState = Object.keys(myState);
        console.log(keysState);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        Test(name, errors, value);//switch wird importiert
        // switch (name) {
        //     case 'fullName':
        //         errors.fullName =
        //             value.length < 5
        //                 ? 'Full Name must be 5 characters long!'
        //                 : '';
        //         break;
        //     case 'email':
        //         errors.email =
        //             validEmailRegex.test(value)
        //                 ? ''
        //                 : 'Email is not valid!';
        //         break;
        //     case 'password':
        //         errors.password =
        //             value.length < 8
        //                 ? 'Password must be 8 characters long!'
        //                 : '';
        //         break;
        //     default:
        //         break;
        // }

        this.setState({
            errors, [name]: value
        });

        // this.setState({ errors, [name]: value }, () => {
        //     console.log(errors)
        // })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm(this.state.errors)) {
            console.info('Valid Form')
        } else {
            console.error('Invalid Form')
        }
    }



    render() {
        const { errors } = this.state;
        return (
            <div className='wrapper'>
                <h1>Get some</h1>
                <div className='form-wrapper'>
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit} noValidate >
                        <div className='fullName'>
                            <label htmlFor="fullName">Full Name</label>
                            <input type='text' name='fullName' onChange={this.handleChange} noValidate />
                            {errors.fullName.length > 0 &&
                                <span className='error'>{errors.fullName}</span>}
                        </div>
                        <div className='email'>
                            <label htmlFor="email">Email</label>
                            <input type='email' name='email' onChange={this.handleChange} noValidate />
                            {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}
                        </div>
                        <div className='password'>
                            <label htmlFor="password">Password</label>
                            <input type='password' name='password' onChange={this.handleChange} noValidate />
                            {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='info'>
                            <small>Password must be eight characters in length.</small>
                        </div>
                        <div className='submit'>
                            <button>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
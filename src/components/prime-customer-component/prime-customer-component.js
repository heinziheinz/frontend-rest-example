import React from 'react';
import axios from 'axios';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

export default class PrimeCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bundesland: '',
            adresse: '',
            isLoaded: false
        };
    }
    componentDidMount() {
        console.log("did mount");
    }
    inputOnClick = (value) => {
        console.log("inputOnClick");
        this.fetchData();
    }

    fetchData = () => {
        const { name, bundesland, adresse } = this.state
        const searchObject = {
            credentials: 'include',
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({
                "name": name,
                "bundesland": bundesland,
                "adresse": adresse
            })
        }

        return fetch(process.env.REACT_APP_URL + 'api/loggedin/prime', searchObject)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        name: result.name,
                        bundesland: result.bundesland,
                        adresse: result.adresse
                    });
                    return result
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )


    }
    render() {
        const { isLoaded } = this.state;
        if (isLoaded) {
            console.log('isLoaded');
            return null;
        } else {
            console.log('is NOT Loaded');
            return (
                <React.Fragment>
                    <InputGroup>
                        <Input />
                        <Input />
                        <InputGroupAddon addonType="append">
                            <Button color="secondary" onClick={this.inputOnClick}>To the Right!</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </React.Fragment>
            );
        }
    }
}

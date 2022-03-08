import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
var CancelToken;
var source;
export default class UpdatePrimeCustomerComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            data: {},
            isLoaded: false,
            articleID: this.props.id//TODO: schauen, wie id "verstaut" wird
        }
    }
    componentDidMount() {
        console.log('updatedPrimeCustomerComponent Did Mount');
        CancelToken = axios.CancelToken;
        source = CancelToken.source();
        this.queryDataBase();
    }
    componentWillUnmount() {
        // console.log('RouteComponent will unmount');

        source.cancel();
    }
    queryDataBase() {
        // Schauen, ob nicht show API besser wäre
        const { articleID } = this.state;
        // console.log(articleID);
        let numberDeclaration = 'number';
        let numberToString = articleID.toString();
        console.log('numberToString');
        console.log(numberToString);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.get(process.env.REACT_APP_URL + 'api/loggedin/prime?' + numberDeclaration + numberToString, {
            cancelToken: source.token
        })
            .then(res => {
                // console.log(res);

                this.setState({
                    isLoaded: true,
                    data: res.data
                });

            }).catch(error => {
                console.log(error.message);

            });
    }
    render() {
        const { data, articleID, isLoaded } = this.state;
        console.log(data);
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            console.log('Redirect UpdatePrimeCustomerComponent');
            return (
                <Redirect to={{
                    pathname: `/all-prime-customers/${articleID}`,
                    query: data
                }} />
            );
        }
    }
}


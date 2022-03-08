import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
var CancelToken;
var source;
export default class UpdateArtikelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoaded: false,
            articleID: this.props.id//TODO: schauen, wie id "verstaut" wird
        }
    }
    componentDidMount() {
        // console.log('updated article components');
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
        axios.defaults.withCredentials = true;
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.get(process.env.REACT_APP_URL + 'api/startpage/startpage/{startpage}?' + numberDeclaration + numberToString, {
            cancelToken: source.token
        })
            .then(res => {
                this.setState({
                    isLoaded: true,
                    data: res.data
                });

            }).catch(error => {
                // console.log(error.message);

            });
    }
    render() {
        const { data, articleID, isLoaded } = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Redirect to={{
                    pathname: `/all-articles/${articleID}`,
                    query: data
                }} />
            );
        }
    }
}


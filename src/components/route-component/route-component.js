import React from 'react';
import axios from 'axios';
import { Badge } from 'reactstrap';
import { Redirect, Route, Link } from 'react-router-dom';
import UpdateRouteComponentFrom from 'components/update-route-component';
// import MySanitiztedDisplay from 'components/route-component/my-sanititzed-display';
import MySanitiztedDisplay from 'components/footer/sanitized-display';
import { array } from 'prop-types';
// import { EscapeHtml } from 'components/regex-collection';

export default class RouteComponent extends React.Component {
    constructor(props) {
        super(props);
        // console.log('another MEKKKOOOOOOOOO');
        // console.log(props.location.query.data.confirmed);
        this.state = {
            isLoaded: false,
            data: {},
            id: null,
            storage: this.props.location.query ? this.props.location.query : JSON.parse(localStorage.getItem('appState'))
        }
    }

    static getDerivedStateFromProps(props, state) {

        if (state.storage) {
            if (Array.isArray(props.location.query)) {
                var mo = props.location.query ? localStorage.setItem('appState', JSON.stringify(props.location.query[0])) : '';
                return { storage: props.location.query };

            } else {
                // console.log('is NOT array');
                var data = state.storage.data;

            }

            if (typeof props.location.query === 'undefined') {
                return {
                    storage: JSON.parse(localStorage.getItem('appState'))
                };
            } else if (props.location.query !== state.storage) {
                return {
                    storage: props.location.query,
                };
            }
            var so = props.location.query ? localStorage.setItem('appState', JSON.stringify(props.location.query)) : '';
            return null;
        }
    }
    componentDidMount() {
        // console.log('Route Component:ROUTE COMPONENT DIT MOUNT');
        if (this.state.storage) {
            if (typeof this.state.storage.data === 'undefined') {
                this.setState({
                    id: this.state.storage.id
                });
            } else {
                this.setState({
                    id: this.state.storage.data.id
                });
            }
        }
    }

    componentDidUpdate() {
        // console.log('Route Component: Component did Update WAS HIT');
    }

    updateHandler = () => {
        // this.updateArticle();
        this.setState({
            isLoaded: true
        });
    }
    redirectToEditArticle = () => {

    }

    componentWillUnmount() {
        // console.log('ROUTE_COMPONENT will unmount');
        // localStorage.clear();
        // localStorage.removeItem('appState');

    }
    render() {
        const { isLoaded, id } = this.state;
        var data;
        let UpdateyourArticle = "Update your Article";
        // console.log('RouteComponent');
        if (this.state.storage) {
            // console.log('enter');
            if (Array.isArray(this.state.storage)) {
                // console.log('is array');
                data = this.state.storage[0];
            } else {
                // console.log('is NOT array');
                if (typeof this.state.storage.data === 'undefined') {
                    data = this.state.storage;
                } else {
                    data = this.state.storage.data;
                }
            }

            // Trial
            // console.log(data);
            // console.log(data);
            var keys = Object.keys || require('object-keys');
            const myState = this.state;
            const arrayOfkeyOfState = keys(data);
            // console.log(arrayOfkeyOfState);
            // console.log(data);
            const newRows = [];
            const mySanitizedText = MySanitiztedDisplay(data, arrayOfkeyOfState);
            // console.log(mySanitizedText);
            // var data = this.state.storage.data;
            // TODO: Extracting Object fpr loop
            if (!(typeof data.blockoftext === 'undefined')) {
                // console.log('data.blockoftext: ' + data.blockoftext);
            }
            // console.log(data);
            return (
                <React.Fragment>
                    <div><Badge style={{ "padding": "10px" }} color={data.confirmed ? "success" : "danger"}>{data.confirmed ? "Displayed" : "Not Displayed"}</Badge></div>
                    <img src={process.env.REACT_APP_URL + data.imagelink} alt={data.captions} />
                    {/* <h6>{data.category}</h6>
                    <h3>{data.headline}</h3>
                    <h4>{data.subheadline}</h4>
                    <p>{data.blockoftext}</p> */}
                    {mySanitizedText}
                    <Link to={{ pathname: `/all-articles/article/${id}`, query: { data } }} >{UpdateyourArticle}</Link>
                    <Route path="/all-articles/article/:id" render={props => <UpdateRouteComponentFrom {...props} items={data} />} />
                </React.Fragment>
            );
        } else {
            return (null);
        }
    }
}
import React from 'react';
import Cookies from 'js-cookie';

export default function withFormValidation(WrappedComponent) {
    class formValidation extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isLoaded: false,
            };
        }


        componentDidMount() {
            console.log('component did fuckin mount');
            // console.log(this.props.myMock);
        }


        componentWillUnmount() {

        }
        componentDidUpdate() {

        }
        handlerChanger = () => {
            console.log('click click click');
            // event.preventDefault();
            const myRequestObject = {
                credentials: 'include',
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrer: 'no-referrer', // no-referrer, *client
                body: JSON.stringify({
                    "email": 'email',
                })// body data type must match "Content-Type" header
            };
            //http:
            const request = new Request(process.env.REACT_APP_URL + "api/password/create", {
                credentials: 'include',
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    "email": 'email',
                }),
                headers: new Headers({ 'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest" }),
            }
            );
            //todo: return nachherwieder entfernen
            fetch(process.env.REACT_APP_URL + "api/password/create", myRequestObject)
                .then(res => {
                    console.log(res);
                    console.log(res.status);//wird im falle eines Fehlers nicht aktiviert
                    if (res.ok) {
                        if (res.status === 200) {
                            console.log('status 200');
                            Cookies.set('reset-password', true, { secure: true });
                            this.setState({ message: 'OK' })
                        }
                        if (res.status === 422) {
                            console.log('invalid credentials');
                            Cookies.set('reset-password', true, { secure: true });
                            this.setState({ message: 'NOT OK' })
                        }
                    }
                    return res;
                })
                .then(res => res.json())
                .then(res => {
                    console.log(res.id);

                    return res;
                })
                .then(
                    (result) => {
                        console.log('fuckin in there');
                        this.setState({
                            isLoaded: true,
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
            if (error) {
                console.group(error);
            } else if (!isLoaded) {
                console.log('IS LOADING');
            } else { }
            return (
                <WrappedComponent onClick={this.handlerChanger} />
            );

        }
    }
    formValidation.displayName = `formValidation(${getDisplayName(WrappedComponent)})`;
    return formValidation;
}
function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
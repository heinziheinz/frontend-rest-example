import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import Kontakt from 'components/footer/kontakt-store-confirmation';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterKontakt extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        const path = "/to-my-destination";
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            body: JSON.stringify(this.props.data),
            signal: this.mySignal
        }
        this.Wrapper = {
            fetch: WithFetchFooterComponent(WithLocalStorage(Kontakt, null), process.env.REACT_APP_URL + 'api/contact/contact', option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
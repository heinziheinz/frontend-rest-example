import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import Impressum from 'components/footer/impressum-store-confirmation';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterFQA extends React.Component {
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
            fetch: WithFetchFooterComponent(WithLocalStorage(Impressum, null), process.env.REACT_APP_URL + 'api/impress/impress', option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
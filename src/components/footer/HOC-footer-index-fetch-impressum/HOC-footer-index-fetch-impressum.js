import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import Impressum from 'components/footer/impressum-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterFQA extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    loclaStorage = 'ImpressumLocalStorage';
    constructor(props) {
        super(props);
        // Component, url, option
        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            signal: this.mySignal
        }
        this.Wrapper = {
            fetch: WithFetchFooterComponent(WithLocalStorage(Impressum, this.loclaStorage), process.env.REACT_APP_URL + 'api/impress/impress', option, this.loclaStorage)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
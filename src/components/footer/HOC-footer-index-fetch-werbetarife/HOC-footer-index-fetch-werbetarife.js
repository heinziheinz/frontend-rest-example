import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import Werbetarife from 'components/footer/mediadaten-tarife';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterWerbetarife extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    loclaStorage = 'WerbeLocalStorage';
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
            fetch: WithFetchFooterComponent(WithLocalStorage(Werbetarife, this.loclaStorage), process.env.REACT_APP_URL + 'api/werben/werben', option, this.loclaStorage)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
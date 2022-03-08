import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import AGB from 'components/footer/agb-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterAGB extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    loclaStorage = 'AGBsLocalStorage';
    constructor(props) {
        super(props);
        // Component, url, option
        // console.log(props);
        // console.log('In the browser');
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
            fetch: WithFetchFooterComponent(WithLocalStorage(AGB, this.loclaStorage), process.env.REACT_APP_URL + 'api/agbs/agbs', option, this.loclaStorage)
        };
        // this.NewWithLocalStorage = WithLocalStorage(AGB);
    }

    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
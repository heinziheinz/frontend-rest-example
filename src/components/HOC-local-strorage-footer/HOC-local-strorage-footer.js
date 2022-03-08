import React from 'react';
import WithLocalStorageFooter from 'components/with-local-storage-footer';
import AGB from 'components/footer/agb-component';

export default class FooterAGB extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
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
        console.log(AGB);
        this.Wrapper = {
            fetch: WithFetchFooterComponent(AGB, process.env.REACT_APP_URL + 'api/agbs/agbs', option)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
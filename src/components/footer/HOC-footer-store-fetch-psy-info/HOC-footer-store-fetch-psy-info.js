import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import PsyInfoFuerPraxis from 'components/footer/psy-info-fuer-praxis';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterPsyInfo extends React.Component {
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
            fetch: WithFetchFooterComponent(PsyInfoFuerPraxis, process.env.REACT_APP_URL + 'api/psyinfo/psyinfo', option)
        };
        this.Wrapper = {
            fetch: WithFetchFooterComponent(WithLocalStorage(PsyInfoFuerPraxis, null), process.env.REACT_APP_URL + 'api/psyinfo/psyinfo', option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
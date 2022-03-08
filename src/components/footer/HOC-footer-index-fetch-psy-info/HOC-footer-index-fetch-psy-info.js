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
            fetch: WithFetchFooterComponent(PsyInfoFuerPraxis, process.env.REACT_APP_URL + 'api/psyinfo/psyinfo', option)
        };
        this.Wrapper = {
            fetch: WithFetchFooterComponent(WithLocalStorage(PsyInfoFuerPraxis, 'PSYINFOLocal'), process.env.REACT_APP_URL + 'api/psyinfo/psyinfo', option, 'PSYINFOLocal')
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
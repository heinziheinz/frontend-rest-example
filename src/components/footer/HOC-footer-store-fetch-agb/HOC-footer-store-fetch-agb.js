import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import AGBstoreOutputConfirm from 'components/footer/agb-store-confirmation-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterAGB extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        console.log(this.props);
        console.log('holooododoododo');
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
            fetch: WithFetchFooterComponent(WithLocalStorage(AGBstoreOutputConfirm, null), process.env.REACT_APP_URL + 'api/agbs/agbs', option, null, path)
        };
        // this.NewWithLocalStorage = WithLocalStorage(AGB);
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
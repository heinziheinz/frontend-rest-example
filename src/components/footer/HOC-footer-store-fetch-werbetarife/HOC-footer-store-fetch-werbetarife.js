import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import MediaTarifestoreOutputConfirm from 'components/footer/mediadaten-tarife-store-confirmation-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FooterWerbetarife extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        console.log(this.props);
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
            fetch: WithFetchFooterComponent(WithLocalStorage(MediaTarifestoreOutputConfirm, null), process.env.REACT_APP_URL + 'api/werben/werben', option, null, path)
        };
        // this.NewWithLocalStorage = WithLocalStorage(AGB);
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
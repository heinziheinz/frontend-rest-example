import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import Kontakt from 'components/footer/kontakt-component';
import KontaktStoreConfirmationComponent from 'components/footer/kontakt-store-confirmation';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class KontaktClass extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        // DELETE | api/agbs/agbs/{agb}
        const id = props.id;
        const path = "/kontakt-form/kontakt-deleted";
        const option = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            signal: this.mySignal
        }
        this.Wrapper = {
            fetch: WithFetchFooterComponent(WithLocalStorage(KontaktStoreConfirmationComponent, null), process.env.REACT_APP_URL + `api/contact/contact/${id}?id=${id}`, option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
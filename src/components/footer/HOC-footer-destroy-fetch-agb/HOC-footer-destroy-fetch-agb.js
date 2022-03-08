import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import AGB from 'components/footer/agb-component';
import AGBStoreConfirmationComponent from 'components/footer/agb-store-confirmation-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class HOCFusion extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        // DELETE | api/agbs/agbs/{agb}
        const id = props.id;
        const path = "/agb-form/agbs-deleted";
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
            fetch: WithFetchFooterComponent(WithLocalStorage(AGBStoreConfirmationComponent, null), process.env.REACT_APP_URL + `api/agbs/agbs/${id}?id=${id}`, option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
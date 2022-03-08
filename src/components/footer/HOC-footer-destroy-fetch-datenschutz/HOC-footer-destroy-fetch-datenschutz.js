import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import DatenSchutz from 'components/footer/datenschutz-store-confirmation-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class Datenschutz extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        // DELETE | api/agbs/agbs/{agb}
        const id = props.id;
        const path = "/datenschutz-form/datenschutz-deleted";
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
            fetch: WithFetchFooterComponent(WithLocalStorage(DatenSchutz, null), process.env.REACT_APP_URL + `api/daten/daten/${id}?id=${id}`, option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
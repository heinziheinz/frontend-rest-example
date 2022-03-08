import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import FQA from 'components/footer/fqa-aertze';
import FQAStoreConfirmationComponent from 'components/footer/fqa-aertze-store-confirmation-component'
import WithLocalStorage from 'components/with-local-storage-footer';
export default class FQAClass extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        // DELETE | api/agbs/agbs/{agb}
        const id = props.id;
        console.log(id);
        const path = "/fqa-form/fqas-deleted";
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
            fetch: WithFetchFooterComponent(WithLocalStorage(FQAStoreConfirmationComponent, null), process.env.REACT_APP_URL + `api/fqa/fqa/${id}?id=${id}`, option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
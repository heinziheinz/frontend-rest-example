import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import MediadatenTarifeStoreConfirmation from 'components/footer/mediadaten-tarife-store-confirmation-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class MediadatenTarifeClass extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        super(props);
        // Component, url, option
        // DELETE | api/agbs/agbs/{agb}
        const id = props.id;
        console.log(id);
        const path = "/media-tarife-form/media-tarife-deleted";
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
            fetch: WithFetchFooterComponent(WithLocalStorage(MediadatenTarifeStoreConfirmation, null), process.env.REACT_APP_URL + `api/werben/werben/${id}?id=${id}`, option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
import React from 'react';
import WithFetchFooterComponent from 'components/with-fetch-footer-component/with-index-fetch-footer-component';
import DatenSchutz from 'components/footer/datenschutz-store-confirmation-component';
// import DatenSchutz from 'components/footer/datenschutz-component';
import WithLocalStorage from 'components/with-local-storage-footer';
export default class HOCFusion extends React.Component {
    AbortController = window.AbortController;
    myController = new AbortController();
    mySignal = this.myController.signal;
    constructor(props) {
        console.log(props.data);
        super(props);
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
            fetch: WithFetchFooterComponent(WithLocalStorage(DatenSchutz, null), process.env.REACT_APP_URL + 'api/daten/daten', option, null, path)
        };
    }
    render() {
        return (
            <this.Wrapper.fetch />

        );
    }
}
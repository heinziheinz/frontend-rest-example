import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';
import HOCinsertAGB from 'components/footer/forms-for-data-storage/form-agb-insect-hoc-as-child';
import HOCFooterIndexFetchAGB from 'components/footer/HOC-footer-index-fetch-agb';
import withFormOrComponent from 'components/footer/with-form-or-component';
const FormOrComponentAGB = (props) => {
    var loaded = false;
    var primedata = {};

    useEffect(() => {
        return () => {
            localStorage.removeItem('AGBsLocal');
        }
    });
    const option = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
        },
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        // signal: this.mySignal
    }
    const Wrapper = {
        fetch: withFormOrComponent(HOCinsertAGB, HOCFooterIndexFetchAGB, process.env.REACT_APP_URL + 'api/agbs/agbs', option)
    }
    return (
        <Wrapper.fetch />
    );
}
export default FormOrComponentAGB;
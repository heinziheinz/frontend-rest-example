import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';
import HOCinsertDatenschutz from 'components/footer/forms-for-data-storage/form-datenschutz-insert-hoc-as-child';
import HOCFooterIndexFetchDatenschutz from 'components/footer/HOC-footer-index-fetch-datenschutz';
import withFormOrComponent from 'components/footer/with-form-or-component';
const FormOrComponentAGB = (props) => {
    var loaded = false;
    var primedata = {};

    useEffect(() => {
        console.log('HOCFOOTERorFORM Datenschutz didi MOUNT');
        return () => {
            localStorage.removeItem('DatenLocal');
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
        fetch: withFormOrComponent(HOCinsertDatenschutz, HOCFooterIndexFetchDatenschutz, process.env.REACT_APP_URL + 'api/daten/daten', option)
    }
    return (
        <Wrapper.fetch />
    );
}
export default FormOrComponentAGB;
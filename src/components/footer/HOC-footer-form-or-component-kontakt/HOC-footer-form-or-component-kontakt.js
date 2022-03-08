import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';
import HOCinsertKontakt from 'components/footer/forms-for-data-storage/form-kontakt-insert-hoc-as-child';
import HOCFooterIndexFetchKontakt from 'components/footer/HOC-footer-index-fetch-kontakt';
import withFormOrComponent from 'components/footer/with-form-or-component';
const FormOrComponentKontakt = (props) => {
    var loaded = false;
    var primedata = {};

    useEffect(() => {
        console.log('HOCFOOTERorFORM Kontakt didi MOUNT');
        return () => {
            console.log('HOCFOOTERorFORM Kontakt did UNMOUNT');
            // 'IMPRESsLocal'
            localStorage.removeItem('KONTAKTLocal');
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
        fetch: withFormOrComponent(HOCinsertKontakt, HOCFooterIndexFetchKontakt, process.env.REACT_APP_URL + 'api/contact/contact', option)
    }
    return (
        <Wrapper.fetch />
    );
}
export default FormOrComponentKontakt;
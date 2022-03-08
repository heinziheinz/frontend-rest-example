import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';
import HOCinsertMediaTarife from 'components/footer/forms-for-data-storage/form-media-tarife-insert-hoc-as-child';
import HOCFooterIndexFetchMediaTarife from 'components/footer/HOC-footer-index-fetch-werbetarife';
import withFormOrComponent from 'components/footer/with-form-or-component';
const FormOrComponentMediaTarife = (props) => {
    var loaded = false;
    var primedata = {};

    useEffect(() => {
        console.log('HOCFOOTERorFORM Media Tarife didi MOUNT');
        return () => {
            console.log('HOCFOOTERorFORM Media Tarife did UNMOUNT');
            // 'IMPRESsLocal'
            localStorage.removeItem('WEBTARIFELocal');
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
        fetch: withFormOrComponent(HOCinsertMediaTarife, HOCFooterIndexFetchMediaTarife, process.env.REACT_APP_URL + 'api/werben/werben', option)
    }
    return (
        <Wrapper.fetch />
    );
}
export default FormOrComponentMediaTarife;
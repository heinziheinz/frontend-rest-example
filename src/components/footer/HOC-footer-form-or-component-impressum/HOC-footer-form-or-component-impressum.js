import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';
import HOCinsertImpressum from 'components/footer/forms-for-data-storage/form-impresssum-insert-hoc-as-child';
import HOCFooterIndexFetchImpressum from 'components/footer/HOC-footer-index-fetch-impressum';
import withFormOrComponent from 'components/footer/with-form-or-component';
const FormOrComponentImpressum = (props) => {
    var loaded = false;
    var primedata = {};

    // useEffect(() => {
    //     // console.log('Hallo use effest');
    //     // // fetchData();
    // });
    useEffect(() => {
        console.log('HOCFOOTERorFORM IMPRESSUM didi MOUNT');
        return () => {
            console.log('HOCFOOTERorFORM IMPRESSUM did UNMOUNT');
            // 'IMPRESsLocal'
            localStorage.removeItem('IMPRESsLocal');
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
        fetch: withFormOrComponent(HOCinsertImpressum, HOCFooterIndexFetchImpressum, process.env.REACT_APP_URL + 'api/impress/impress', option)
    }
    return (
        <Wrapper.fetch />
    );
}
export default FormOrComponentImpressum;
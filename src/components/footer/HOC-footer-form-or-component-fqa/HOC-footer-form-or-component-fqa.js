import React, { useEffect } from 'react';
import Fetcha from 'components/fetcha-component';
import HOCinsertFQA from 'components/footer/forms-for-data-storage/form-fqa-insert-hoc-as-child';
import HOCFooterIndexFetchFQA from 'components/footer/HOC-footer-index-fetch-fqa';
import withFormOrComponent from 'components/footer/with-form-or-component';
const FormOrComponentFQA = (props) => {
    var loaded = false;
    var primedata = {};

    useEffect(() => {
        console.log('HOCFOOTERorFORM FQA didi MOUNT');
        return () => {
            console.log('HOCFOOTERorFORM FQA did UNMOUNT');
            // 'IMPRESsLocal'
            localStorage.removeItem('FQALocal');
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
        fetch: withFormOrComponent(HOCinsertFQA, HOCFooterIndexFetchFQA, process.env.REACT_APP_URL + 'api/fqa/fqa', option)
    }
    return (
        <Wrapper.fetch />
    );
}
export default FormOrComponentFQA;
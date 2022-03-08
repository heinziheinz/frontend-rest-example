import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import useFetch from 'components/fetch-generic-component/use-fetch';
import PaginationForPrimeCustomers from 'components/pagination-for-prime-customers';
import FooterFormAGB from 'components/footer/forms-for-data-storage/form-agb';
import FormAGBInsertHOCAsChild from 'components/footer/forms-for-data-storage/form-agb-insect-hoc-as-child';
import FooterFormDatenschutz from 'components/footer/forms-for-data-storage/form-datenschutz';
import FormDatenschutzInsertHOCAsChild from 'components/footer/forms-for-data-storage/form-datenschutz-insert-hoc-as-child';
import FooterFormFQA from 'components/footer/forms-for-data-storage/form-fqa';
import FormFQAInsertHOCAsChild from 'components/footer/forms-for-data-storage/form-fqa-insert-hoc-as-child';
import FormKontaktInsertHOCAsChild from 'components/footer/forms-for-data-storage/form-kontakt-insert-hoc-as-child';
import FormMediaTarifeInsertHOCAsChild from 'components/footer/forms-for-data-storage/form-media-tarife-insert-hoc-as-child';
import FormMImpressumInsertHOCAsChild from 'components/footer/forms-for-data-storage/form-impresssum-insert-hoc-as-child';
// try
import HOCFooterFormOrComponentAGB from 'components/footer/HOC-footer-form-or-component-AGB/HOC-footer-form-or-component-AGB';
import HOCFooterFormOrComponentDatenschutz from 'components/footer/HOC-footer-form-or-component-datenschutz';
import HOCFooterFormOrComponentFQA from 'components/footer/HOC-footer-form-or-component-fqa';
import HOCFooterFormOrComponentKontakt from 'components/footer/HOC-footer-form-or-component-kontakt';
import HOCFooterFormOrComponentWerbeTarife from 'components/footer/HOC-footer-form-or-component-media-tarife';
import HOCFooterFormOrComponentImpressum from 'components/footer/HOC-footer-form-or-component-impressum';
import DataHasBeenSaved from 'components/data-has-been-stored-component';

const BasicUserTemporaryWelcomeDisplayComponent = () => {
    return (
        <>
            <h4>Welcome Visiter</h4>
            <p>This website is under currently in developement.</p>
            <p>Soon there will be Features to interact with psychologist of your choice.</p>
            <p>Till soon. Stay connected! </p>
        </>
    );
}
const AllProfiles = (props) => {
    // console.log(props);
    const optionsObject = {
        credentials: 'include',
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
    };
    const res = useFetch(process.env.REACT_APP_URL + 'api/loggedin/prime', optionsObject);
    // console.log(res.isLoading);
    // console.log(res.response);
    if (res.isLoading == true) {
        return <p>isloading</p>;
    } else if (res.response !== null) {
        // console.log(res.isLoading);
        // console.log(res.response);
        return (
            <>
                <h1>All Profiles</h1>
                <PaginationForPrimeCustomers data={res.response.allCustomers} />
            </>
        );

    } else {
        return <p>{'res.error'}</p>;
    }
}

function RouterForAllProfiles(props) {
    // this route receives it`s props by article-component that redirects!!

    // console.log('hit route profile FORM');
    // useEffect(() => {
    // console.log('RouterForAllProfiles DID MOunt');
    //     return () => {
    // console.log('RouterForAllProfiles DID UNMOUNT');
    //     }
    // });
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/profile-all-form" render={props => <AllProfiles {...props} />} />
                {/* <Route path="/agb-form" render={props => <FormAGBInsertHOCAsChild {...props} />} /> */}
                <Route path="/agb-form" render={props => <HOCFooterFormOrComponentAGB {...props} />} />
                {/* <Route path="/datenschutz-form" render={props => <FormDatenschutzInsertHOCAsChild {...props} />} /> */}
                <Route path="/datenschutz-form" render={props => <HOCFooterFormOrComponentDatenschutz {...props} />} />
                {/* <Route path="/fqa-form" render={props => <FormFQAInsertHOCAsChild {...props} />} /> */}
                <Route path="/fqa-form" render={props => <HOCFooterFormOrComponentFQA {...props} />} />
                {/* <Route path="/kontakt-form" render={props => <FormKontaktInsertHOCAsChild {...props} />} /> */}
                <Route path="/kontakt-form" render={props => <HOCFooterFormOrComponentKontakt {...props} />} />
                {/* <Route path="/media-tarife-form" render={props => <FormMediaTarifeInsertHOCAsChild {...props} />} /> */}
                <Route path="/media-tarife-form" render={props => <HOCFooterFormOrComponentWerbeTarife {...props} />} />
                {/* <Route path="/impressum-form" render={props => <FormMImpressumInsertHOCAsChild {...props} />} /> */}
                <Route path="/impressum-form" render={props => <HOCFooterFormOrComponentImpressum {...props} />} />
                <Route path="/data-has-been-saved" render={props => <DataHasBeenSaved {...props} />} />
                <Route path="/basic-user-temporary-welcome-display" render={props => <BasicUserTemporaryWelcomeDisplayComponent {...props} />} />
            </Switch>
        </Suspense>

    );
}
export default RouterForAllProfiles;
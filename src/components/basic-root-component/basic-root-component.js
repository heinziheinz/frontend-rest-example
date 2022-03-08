import React, { Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import SignUpLoginLogout from './../login-and-signup';
import ResetPassword from './../reset-password-start';
import ResetPasswordFinal from './../reset-password-final';
import ResetPasswordFinalMessage from './../reset-password-final-message';
import PasswordResetNotification from './../password-reset-notification';
import SignUpConfirmation from './../signup-site-confirmation';
import RestOfWebsite from './../rest-of-website';
import LoggedIn from './../logged-in-component';
import LoggedOut from './../logged-out-component';
import Cookies from 'js-cookie';
const StartSiteAfterLoginComponent = React.lazy(() => import('components/start-site-after-login-component'));
const HOCFooterAGBTs = React.lazy(() => import('components/footer/HOC-footer-index-fetch-agb/HOC-footer-index-fetch-agb'));
const Datenschutz = React.lazy(() => import('components/footer/HOC-footer-index-fetch-datenschutz'));
const FQAAertze = React.lazy(() => import('components/footer/HOC-footer-index-fetch-fqa'));
const Impressum = React.lazy(() => import('components/footer/HOC-footer-index-fetch-impressum'));
const Kontakt = React.lazy(() => import('components/footer/HOC-footer-index-fetch-kontakt'));
const BussinessAerzte = React.lazy(() => import('components/footer/HOC-footer-index-fetch-psy-info'));
const MediadatenTarife = React.lazy(() => import('components/footer/HOC-footer-index-fetch-werbetarife'));

const Temporary = () => {
    return (
        <p>AGB Test</p>
    );
}

const LoginSignupComponent = () => {
    return (
        <React.Fragment>
            <Route path="/login" component={SignUpLoginLogout} />
            {/* <Route path="/" exact component={RestOfWebsite} /> */}
            <Route exact path="/logged-in" render={() => (
                Cookies.get('signedin') === 'true' ? (
                    <Route path="/logged-in" component={LoggedIn} />
                ) : (
                    <Redirect to="/login" />
                )
            )} />
            <Route path="/logged-out" render={() => (
                Cookies.get('logged-out') === 'true' ? (
                    <Route path="/logged-out" component={LoggedOut} />
                ) : (
                    <Redirect to="/login" />
                )
            )} />
            <Route path="/signup-site-confirmation" render={() => (
                Cookies.get('signupaction') === 'true' ? (
                    <Route path="/signup-site-confirmation" component={SignUpConfirmation} />
                ) : (
                    <Redirect to="/login" />
                )
            )} />
            <Route path="/reset-password" component={ResetPassword} />

            <Route path="/reset-notification" render={() => (
                Cookies.get('reset-password') === 'true' ? (
                    <Route path="/reset-notification" component={PasswordResetNotification} />
                ) : (
                    <Redirect to="/login" />
                )
            )} />
            <Route path="/reset-password-final" render={() => (//componente wurde schon erstellt
                Cookies.get('findResetPassword') === 'true' ? (
                    <Route path="/reset-password-final" component={ResetPasswordFinal} />
                ) : (
                    // <Redirect to="/login"/>
                    <Redirect to="/login" />
                )
            )} />
            {/* reset-password-final ist in extrafile: reset-password */}
            <Route path="/reset-password-final-message" render={() => (//Componente wurde erstellt
                Cookies.get('finalMessage') === 'true' ? (
                    <Route path="/reset-password-final-message" component={ResetPasswordFinalMessage} />
                ) : (
                    <Redirect to="/login" />
                )
            )} />
            <Suspense fallback={<div>Loading</div>}>
                <Route path="/startpage/:id" component={StartSiteAfterLoginComponent} />
            </Suspense>
        </React.Fragment>
    );
}//ende
const Dummy = () => {
    return (
        <h1>Hallo, I am Dummy</h1>
    );
}
/**
 * Die dazupassenden Links sind in footer-components.jsx zu finden.
 * footer-components.jsx ist in index.js eingebunden
 */
const BasicFooterRouteComponentLeft = () => {
    return (
        <Suspense fallback={<div>Loading</div>}>
            <Route path="/FQA/psychotherapeuten" component={FQAAertze} />
        </Suspense >
    );
}
const BasicFooterRouteComponentMiddle = () => {
    return (
        <>
            <Suspense fallback={<div>Loading</div>}>
                <Route path="/business/aertze" component={BussinessAerzte} />
                <Route path="/ratgeber/mediadaten-tarife" component={MediadatenTarife} />
            </Suspense>
        </>
    );
}
const BasicFooterRouteComponentRight = () => {
    return (
        <>
            <Suspense fallback={<div>Loading</div>}>
                <Route path="/datenschutz" component={Datenschutz} />
                <Route path="/agb" component={HOCFooterAGBTs} />
                <Route path="/kontakt" component={Kontakt} />
                <Route path="/impressum" component={Impressum} />
            </Suspense>
        </>
    );
}
// TODO: Redirect from agb-form.jsx. Nicht klar, wie man das testetq
const FooterFormRoutes = (props) => {
    return (
        <>
            <Suspense fallback={<div>Loading</div>}>
                <Route path={`/agb-store-success/${props.createdId}`} component={Temporary} />
            </Suspense>
        </>
    );
}

export default LoginSignupComponent;
export { BasicFooterRouteComponentLeft, BasicFooterRouteComponentMiddle, BasicFooterRouteComponentRight };












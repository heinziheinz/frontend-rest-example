import 'bootstrap/dist/css/bootstrap.min.css';
import 'abortcontroller-polyfill';
import React from 'react';
import ReactDOM, { hydrate } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import BasicRootComponent,
{
  BasicFooterRouteComponentLeft,
  BasicFooterRouteComponentMiddle,
  BasicFooterRouteComponentRight
} from './components/basic-root-component';
import SignupActivateUrl from './components/signup-activate-url';
import PasswordResetTokenUrl from './components/password-reset-token-url';
import RouterForProfiles from 'components/router-for-profiles';
import RouterForAllProfiles from 'components/router-for-all-profiles';
import FormForStartPage from './components/form-for-start-page';
import FormForStartPageIndex from './components/form-for-start-page-index';
import RouteComponent from 'components/route-component';
import RouteForArticleFormStartPageComponent from 'components/router-for-article-form-start-page';
// import PaginationResult from 'components/pagination-hook-variante/pagination-hook-variante';
import StartpageArticles from 'components/nested-routes';
import SingleDoctor from 'components/single-doctor-component';
import PrimeRouteComponent from 'components/prime-route-component';
import Footer from 'components/footer';
// window.onload = function () {
// };
document.addEventListener("DOMContentLoaded", ready);
function ready() {
  // console.log('ONPAINT');
  localStorage.clear();
}

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  console.log('HYDRATE');
  console.log(rootElement.childNodes.length);
  console.log(rootElement.hasChildNodes());
  hydrate(
    <React.Fragment>
      <BrowserRouter>
        <StartpageArticles />


        <BasicRootComponent />
        <BasicFooterRouteComponentLeft />
        <BasicFooterRouteComponentMiddle />
        <BasicFooterRouteComponentRight />
        <SignupActivateUrl />
        <PasswordResetTokenUrl />
        <RouteForArticleFormStartPageComponent />
        <RouterForProfiles />
        <RouterForAllProfiles />
        <Route path="/all-articles/:id" render={props => {
          return <RouteComponent {...props} />;
        }} />
        <Route path="/all-prime-customers/:id" render={props => {

          return <PrimeRouteComponent {...props} />;
        }} />
        <SingleDoctor />

        <Route path="/" component={Footer} exact />
      </BrowserRouter>
    </React.Fragment>
    , rootElement);
} else {
  console.log('NO HYDRATE');
  console.log(rootElement.childNodes);
  ReactDOM.render(
    <React.Fragment>
      <BrowserRouter>
        <StartpageArticles />

        <BasicRootComponent />
        <BasicFooterRouteComponentLeft />
        <BasicFooterRouteComponentMiddle />
        <BasicFooterRouteComponentRight />
        <SignupActivateUrl />
        <PasswordResetTokenUrl />
        <RouteForArticleFormStartPageComponent />
        <RouterForProfiles />
        <RouterForAllProfiles />
        <Route path="/all-articles/:id" render={props => {

          return <RouteComponent {...props} />;
        }} />
        <Route path="/all-prime-customers/:id" render={props => {

          return <PrimeRouteComponent {...props} />;
        }} />
        <SingleDoctor />

        <Route path="/" component={Footer} exact />
      </BrowserRouter>
    </React.Fragment>, document.getElementById('root'));
  // serviceWorker.unregister();
}


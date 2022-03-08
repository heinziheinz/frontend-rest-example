import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import SignUpLoginLogout from './bootstrap/bootstrap-login-and-signup-form';
import SignUpLoginLogout from './components/login-and-signup';
import ResetPassword from './bootstrap/bootstarp-reset-password-start';
import LogoutButton from './logout-button';
import ResetPasswordFinal from './reset-password-final';
import Cookies from 'js-cookie';


const ResetPasswordFinalMessage = (props) => {
  Cookies.remove('finalMessage', { secure: true });
  const message = props.location.state.message;
  return <h2>{message}</h2>;
}

const PasswordRestNotification = (props) => {

  Cookies.remove('reset-password', { secure: true });

  return <h2>{props.location.state.message}</h2>;
}

const RouteResetPassword = () => {
  return (
    <ResetPassword />
  );
}

const SignUpSite = (props) => {
  Cookies.remove('signupaction', { secure: true });
  return <h2>{props.location.state.signupMeassage}</h2>;
}

const LoginOrSignupForm = () => {
  return (
    <SignUpLoginLogout />
  );
}
const RestOfWebsite = () => {
  return (
    <h1>Hallo, ich bin die restliche Website</h1>
  );
}

const LoggedIn = () => {
  return (
    <React.Fragment>
      <h3>Logged in !!! man</h3>
      <LogoutButton />
    </React.Fragment>
  );
}
function LoggedOut() {

  Cookies.remove('signedin', { secure: true });
  Cookies.remove('logged-out', { secure: true });
  return (
    <React.Fragment>
      <h3>LoggedOut</h3>
    </React.Fragment>
  );
}

const LoginSignupComponent = () => {
  // console.log(Cookies.get('logged-out') === 'true');
  return (
    <React.Fragment>
      <Route path="/login" component={LoginOrSignupForm} />
      <Route path="/" exact component={RestOfWebsite} />
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
      <Route path="/signup-site" render={() => (
        Cookies.get('signupaction') === 'true' ? (
          <Route path="/signup-site" component={SignUpSite} />
        ) : (
          <Redirect to="/login" />
        )
      )} />
      <Route path="/reset-password" component={RouteResetPassword} />

      <Route path="/reset-notification" render={() => (
        Cookies.get('reset-password') === 'true' ? (
          <Route path="/reset-notification" component={PasswordRestNotification} />
        ) : (
          <Redirect to="/login" />
        )
      )} />
      <Route path="/reset-password-final" render={() => (
        Cookies.get('findResetPassword') === 'true' ? (
          <Route path="/reset-password-final" component={ResetPasswordFinal} />
        ) : (
          // <Redirect to="/login"/>
          <Redirect to="/login" />
        )
      )} />
      {/* reset-password-final ist in extrafile: reset-password */}
      <Route path="/reset-password-final-message" render={() => (
        Cookies.get('finalMessage') === 'true' ? (
          <Route path="/reset-password-final-message" component={ResetPasswordFinalMessage} />
        ) : (
          <Redirect to="/login" />
        )
      )} />
    </React.Fragment>
  );
}//ende

export default LoginSignupComponent;












import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
const FromForProfilesComponent = React.lazy(() => import('components/form-for-profiles-component'));
function RouterForProfileComponent(props) {
    // this route receives it`s props by article-component that redirects!!

    // console.log('hit route profile FORM');
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/profile-form" render={props => <FromForProfilesComponent {...props} />} />
            </Switch>
        </Suspense>

    );
}
export default RouterForProfileComponent;
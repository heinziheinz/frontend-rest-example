import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
const FormForStartPage = React.lazy(() => import('components/form-for-start-page'));
function RouteForArticleFormStartPageComponent(props) {
    // this route receives it`s props by article-component that redirects!!

    // console.log('ARTIKLE COMPONENT');
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route path="/article-form" render={props => <FormForStartPage {...props} />} />
            </Switch >
        </Suspense>
    );
}
export default RouteForArticleFormStartPageComponent;
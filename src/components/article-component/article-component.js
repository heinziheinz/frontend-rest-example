import React from 'react';
import { Redirect } from 'react-router-dom';
function ArtikleComponent(props) {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.

    return (
        null
        // <Redirect to={{
        //     pathname: "/" + props.match.params.id,
        //     state: { items: props.items }
        // }} />
    );
}
export default ArtikleComponent;
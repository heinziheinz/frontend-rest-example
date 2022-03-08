import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const DataHasBeenStoredComponent = (props) => {
    console.log(props.location.state);
    console.log(props.state);
    const [myredirect, setmyredirect] = useState(false);
    window.setTimeout(() => {
        setmyredirect(true)
    }, 3000);

    if (myredirect === false) {
        return (
            <h3>Data has been stored</h3>
        );
    } else if (myredirect === true) {
        return (<Redirect to={{
            pathname: "/profile-all-form",
            state: { state: props.location.state }
        }}
        />);
    } else {
        return <h3>What da heck happend</h3>;
    }
}
export default DataHasBeenStoredComponent;


import React from 'react';

const useMyState = (props) => {
    const [state, setstate] = React.useState(props);
    return [state, setstate];
}

export default useMyState;
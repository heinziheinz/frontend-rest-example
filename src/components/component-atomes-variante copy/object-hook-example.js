import React, { useState } from 'react';

const useMyState = (props) => {
    const [state, setstate] = React.useState(props);
    return [state, setstate];
}
const ObjectHookExample = (props) => {
    // console.log('tessto');
    const pageSize = 20;
    const pagesCount = Math.ceil(props.data.length / pageSize);
    const startState = {
        currentPage: 0,
        pagesCount: pagesCount
    };
    // console.log(startState);
    const [state, setstate] = useMyState(startState);

    const onClickHandler = (props) => {
        setstate({
            ...state,
            currentPage: props.currentPage
        });
    }
    const name = props.upOrDown ? <span>
        {React.cloneElement(props.arti, { data: props.data, state: state, pageSize: pageSize })}
        {React.cloneElement(props.paginationNavigation, { onClickHandler: onClickHandler, state: state })}
    </span> :
        <span>
            {React.cloneElement(props.paginationNavigation, { onClickHandler: onClickHandler, data: props.data, state: state })}
            {React.cloneElement(props.arti, { data: props.data, state: state, pageSize: pageSize })}
        </span>;


    React.useEffect(() => {
        // console.log(state);
    });

    return (
        <div>
            {name}
        </div>
    );
}
export default ObjectHookExample;
import React, { useState } from 'react';

const useMyState = (props) => {
    // console.log(props);
    const [state, setstate] = React.useState(props);
    return [state, setstate];
}
const ObjectHookExample = (props) => {
    // console.log('ObjectHook');
    // console.log(props);
    console.log(props);
    const pageSize = 10;
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
    const name = props.upOrDown ? <>
        {React.cloneElement(props.arti, { data: props.data, state: state, pageSize: pageSize })}
        {React.cloneElement(props.paginationNavigation, { onClickHandler: onClickHandler, state: state })}
    </> :
        <>
            {React.cloneElement(props.paginationNavigation, { onClickHandler: onClickHandler, data: props.data, state: state })}
            {React.cloneElement(props.arti, { data: props.data, state: state, pageSize: pageSize })}
        </>;


    React.useEffect(() => {
        // console.log(state);
    });

    return (
        <>
            {name}
        </>
    );
}
export default ObjectHookExample;
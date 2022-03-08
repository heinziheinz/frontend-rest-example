import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ObjectHookExample from './object-hook-example';
import Arti from './arti';
import PaginationNavigation from './third-handler';
const CompositionComponent = (props) => {
    return (

        <ObjectHookExample
            data={props.data}
            upOrDown={true}
            paginationNavigation={
                <PaginationNavigation />
            }
            arti={
                <Arti />
            }
        />
    );
}

export default CompositionComponent;
import React from 'react';
import { directive } from '@babel/types';//TODO do some research on that
import WithHOC from './with-testing-to-learn';

class DisplaySearchResults extends React.Component {
    render() {
        return (
            <button onClick={this.props.onClick}>click</button>
        );
    }
}

export default WithHOC(DisplaySearchResults);
export { DisplaySearchResults };
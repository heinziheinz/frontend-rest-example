import React, { Component } from 'react';

const ButtonCollection = () => {
    return <button>{'niceButton'}</button>;
}
class MyButtonCollection extends Component {
    componentDidMount() {
        console.log('componentDidMount');
    }
    handle = (props) => {
        this.props.clickSpy(props);
        console.log('handle has been clicked');
    }
    render() {
        return (
            <button style={{ "display": "flex" }} onClick={this.handle}>Click</button>
        );
    }
}
export default ButtonCollection;
export { MyButtonCollection };
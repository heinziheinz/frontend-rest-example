import React from 'react';
import LoginFormTemporary from '../loginform-temporary';
import WithFormValidation from '../with-form-validation';

export default class HOCFusion extends React.Component {
    constructor(props) {
        super(props);
        this.Wrapper = {
            ajaxQuerrie: WithFormValidation(LoginFormTemporary)
        };
    }
    toggle = () => {
        console.log('has been clicked HOC');
        this.props.toggle();
    }
    render() {
        console.log(this.props.loginCollapse);
        console.log(this.props.toggle);
        console.log('LEts logg');
        return (
            <this.Wrapper.ajaxQuerrie
                loginRadioButtonState={this.props.loginRadioButtonState}
                toggle={this.toggle}
                loginCollapse={this.props.loginCollapse}
                thisIsSingUpForm={false}
            />

        );
    }
}
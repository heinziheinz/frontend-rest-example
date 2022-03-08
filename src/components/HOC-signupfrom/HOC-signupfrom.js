import React from 'react';
import SignupFormTemporary from '../signupfrom-temporary/signupform-temporary';
import WithFormValidation from '../with-form-validation';

const Tschik = () => {

}

export default class HOCFusion extends React.Component {
    constructor(props) {
        super(props);
        this.Wrapper = {
            ajaxQuerrie: WithFormValidation(SignupFormTemporary)
        };
    }
    toggle = () => {
        console.log('has been clicked HOC');
        this.props.toggle();
    }
    render() {
        return (
            <this.Wrapper.ajaxQuerrie
                loginRadioButtonState={this.props.signupRadioButtonState}
                toggle={this.toggle}
                loginCollapse={this.props.signupCollapse}
                thisIsSingUpForm={true}
            />
        );
    }
}
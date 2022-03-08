import React from 'react';
import { shallow, mount } from 'enzyme';
import FormComponent from './../form-for-profiles-component';

describe('<FormComponent/>', () => {
    it('does component render', () => {
        const event = {
            target: {
                name: 'image',
                value: 'C:\fakepath\rose-blue-flower-rose-blooms-67636.jpeg',
                files: [{ name: "rose-blue-flower-rose-blooms-67636.jpeg", lastModified: 1569919252338, webkitRelativePath: "", size: 290355, type: "image/jpeg" }]
            }
        };
        const wrapper = shallow(<FormComponent />);
        wrapper.instance().onAddingImage(event);
        console.log(wrapper.state().errors.imageExtension);
        expect(wrapper.state().errors.imageExtension).not.toEqual('NOT ACCEPTED: InvalidImage extension!');
    });
    it('component does mount', () => {
        const event = {
            target: {
                name: 'image',
                value: 'C:\fakepath\rose-blue-flower-rose-blooms-67636.jpeg',
                files: [{ name: "rose-blue-flower-rose-blooms-67636.jpeg", lastModified: 1569919252338, webkitRelativePath: "", size: 290355, type: "image/jpeg" }]
            }
        };
        const wrapper = mount(<FormComponent />);
        wrapper.instance().onAddingImage(event);
    });
    it('does error display get the right error message', () => {
        const event = {
            target: {
                name: 'image',
                value: 'C:\fakepath\rose-blue-flower-rose-blooms-67636.jpeg',
                files: [{ name: "rose-blue-flower-rose-blooms-67636.jpeg", lastModified: 1569919252338, webkitRelativePath: "", size: 290355, type: "image/jpeg" }]
            }
        };
        const wrapper = mount(<FormComponent />);
        wrapper.instance().onAddingImage(event);
        console.log(wrapper.state());
        console.log(wrapper.find('ErrorDisplay').at(14).props());// too much nodes
    });
});

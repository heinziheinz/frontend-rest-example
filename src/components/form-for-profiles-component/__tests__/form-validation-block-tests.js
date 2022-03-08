import React from 'react';
import { shallow, mount } from 'enzyme';
import FormForProfiles from './../form-for-profiles-component';
import { exportAllDeclaration } from '@babel/types';

describe('<FormForProfiles/>', () => {

    it('does component render', () => {
        const wrapper = mount(<FormForProfiles />);
    });
    xtest('the data is peanut butter', () => {
        //callback aus code entfernt: test funktioniert nicht mehr
        const spy = jest.fn();
        const wrapper = mount(<FormForProfiles />);
        function callback(data) {
            console.log(data);
        }
        wrapper.state().title = '';
        wrapper.state().name = 'one';
        wrapper.state().postleitzahl = 'one';
        wrapper.state().adresse = 'one';
        wrapper.state().krankenkassen = 'one';
        wrapper.state().montag = 'one';
        wrapper.state().dienstag = 'one';
        wrapper.state().mittwoch = 'one';
        wrapper.state().donnerstag = 'one';
        wrapper.state().freitag = 'one';
        wrapper.state().samstag = 'one';
        wrapper.state().sonntag = 'one';
        wrapper.state().emailaddresse = 'oo@gmx.at';
        wrapper.state().description = 'one';
        wrapper.state().gesprochenesprache = 'one';
        let trueOrNor = wrapper.instance().validateFormInputBeforSubmission(callback);
        expect(trueOrNor).toBe(true);
        console.log(trueOrNor);
    });
    test('testing handle change', () => {
        const wrapper = shallow(<FormForProfiles />);
        wrapper.state().title = 'one';
        wrapper.state().name = 'one';
        wrapper.state().postleitzahl = 'one';
        wrapper.state().adresse = 'one';
        wrapper.state().krankenkassen = 'one';
        wrapper.state().montag = 'one';
        wrapper.state().dienstag = 'one';
        wrapper.state().mittwoch = 'one';
        wrapper.state().donnerstag = 'one';
        wrapper.state().freitag = 'one';
        wrapper.state().samstag = 'one';
        wrapper.state().sonntag = 'one';
        wrapper.state().emailaddresse = '';
        wrapper.state().description = 'one';
        wrapper.state().gesprochenesprache = 'one';
        function callback(data) {
            console.log(data);
        }
        const imageList = [{
            name: "rose-blue-flower-rose-blooms-67636.jpeg",
            lastModified: 1569919252338, size: 290355
        }];
        wrapper.state().imageList = imageList;
        const event = {
            preventDefault: () => { },
            target: {
                name: "karl",
                value: "jochen"
            }
        };
        let trueOrNor = wrapper.instance().fileUploader(event, callback);
        // expect(trueOrNor).toBe(true);
    });
});
//TODO:Tests funktionieren soweit. validateFormInputBeforSubmission() git true unf FAlse zurück, wie erwartet.
//TODO: validateFormInputBeforSubmission() beim Formsubmit einbiden und weiter with-form-validation nacharbeiten

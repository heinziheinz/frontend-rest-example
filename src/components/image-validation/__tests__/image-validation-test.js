import React from 'react';
import { shallow, mount } from 'enzyme';
import ImageValidation, { ImageValidationWithStateManupulation } from './../image-validation';
import { MySwitchForPrimeUser } from 'components/conditional-components';
describe('<ImageValidationComponent/>', () => {

    it('does image validation mount', () => {
        //Check Image Validation

        let name = 'image';
        const errors = {
            title: ''
        };
        let value = 'C:\fakepath\rose-blue-flower-rose-blooms-67636.jpeg';
        const my = ImageValidation(name, errors, value);
        console.log(my);
        expect(ImageValidation(name, errors, value)).toBe(true);
        // const my = shallow(<ImageValidation />);
        // console.log(my);
    });
    it('ImageUpload with staet manipulation', () => {

        let name = 'image';
        const errors = {
            title: ''
        };
        let value = 'C:\fakepath\rose-blue-flower-rose-blooms-67636.jpeg';
        ImageValidationWithStateManupulation(name, errors, value);
        expect(errors.title).not.toEqual('NOT ACCEPTED: InvalidImage extension!');
        console.log(errors.title);
    });
});
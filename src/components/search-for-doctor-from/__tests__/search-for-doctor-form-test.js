import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import SearchForDoctorForm from './../search-for-doctor-form';
import useFetchState from './../use-fetch-state';
// useFetchState habe ich gelöscht
jest.mock('./../use-fetch-state');



describe('<SearchForDoctorForm', () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    // beforeEach(() => {
    //     wrapper = mount(<SearchForDoctorForm />)
    // });
    xtest('component did mount', () => {
        expect(wrapper.find("FormGroup")).toExist();
        expect(wrapper.find("Label")).toExist();
        expect(wrapper.find("Label").at(0)).toIncludeText('Suche nach Arzt');
        expect(wrapper.find("Label").at(1)).toIncludeText('Suche nach Ort');
        expect(wrapper.find("Input")).toExist();
        expect(wrapper.find("FormText")).toExist();
        expect(wrapper.find("FormText").at(0)).toIncludeText('Suchen Sie nach Ihrem Psychologen.');
        expect(wrapper.find("FormText").at(1)).toIncludeText('Ortsbezogene Suche');
    });
    xtest('first input field change works', () => {
        // console.log(wrapper.find("Input").at(0).props().name);
        expect(wrapper.find("Input").at(0).props().name).toBe('searchfordoctor');
        wrapper.find("Input").at(0).simulate('change', { target: { name: 'searchfordoctor', value: 'Say' } });
        expect(wrapper.find("Input").at(0).props().value).toBe('Say');
        // expect(setState).toHaveBeenCalledWith({ searchfordoctor: 'Say' });
    });
    xtest('second input field change works', () => {
        // console.log(wrapper.find("Input").at(0).props().name);
        expect(wrapper.find("Input").at(1).props().name).toBe('location');
        wrapper.find("Input").at(1).simulate('change', { target: { name: 'location', value: 'Some' } });
        // expect(wrapper.find("Input").at(1).props().value).toBe('Some');
        expect(setState).toHaveBeenCalledWith({ searchfordoctor: '', location: 'Some', state: "" });
    });

    xtest('submit form', async () => {
        expect(wrapper.find('button')).not.toExist();
        // wrapper.find('button').props().onClick();
    });

    xtest('', () => {
        const apiStates = {
            LOADING: 'LOADING',
            SUCCESS: 'SUCCESS',
            ERROR: 'ERROR',
        };
        useFetchState.mockReturnValue({
            state: 'FORM'
        });
        const tree = mount(<SearchForDoctorForm title="Test" />);
        expect(tree).toMatchSnapshot();
    })
    xtest('', () => {
        const apiStates = {
            LOADING: 'LOADING',
            SUCCESS: 'SUCCESS',
            ERROR: 'ERROR',
        };
        useFetchState.mockReturnValue({
            state: 'SUCCESS'
        });
        const tree = mount(<SearchForDoctorForm title="Test" />);
        expect(tree.find('p')).toExist();
        expect(tree.find('p')).toIncludeText('SUCCESS');
        // expect(tree).toMatchSnapshot();
    })
    xtest('', () => {
        const apiStates = {
            LOADING: 'LOADING',
            SUCCESS: 'SUCCESS',
            ERROR: 'ERROR',
        };
        useFetchState.mockReturnValue({
            state: 'LOADING'
        });
        const tree = mount(<SearchForDoctorForm title="Test" />);
        expect(tree.find('p')).toExist();
        expect(tree.find('p')).toIncludeText('LOADING');
        // expect(tree).toMatchSnapshot();
    })
    test('', () => {
        const apiStates = {
            LOADING: 'LOADING',
            SUCCESS: 'SUCCESS',
            ERROR: 'ERROR',
        };
        useFetchState.mockReturnValue({
            state: 'LOA'
        });
        const tree = mount(<SearchForDoctorForm title="Test" />);
        expect(tree.find('p')).toExist();
        expect(tree.find('p')).toIncludeText('default');
        // expect(tree).toMatchSnapshot();
    })

});

// https://medium.com/javascript-in-plain-english/react-controlled-forms-with-hooks-538762aab935
// https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
// https://codesandbox.io/s/qvv98?file=/src/index.js:3558-3566
// das durchgenken:
/**
 * 1.im pagination project nachschauen, wie es doch möglich ist, das effect render ein weiters mal updateted und
 * sich die auch im renderen niederschlägt
 * 2. Router weiterleitung auss´checken
 * 3. Die Architektur, wie im Pagination Project schon angelegt, hier verbinden.
 * 4.Waas ist alles zu sehen auf dieser Route: Componenten anlegen
 */
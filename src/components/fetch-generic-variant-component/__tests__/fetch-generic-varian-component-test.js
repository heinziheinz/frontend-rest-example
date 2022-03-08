import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import FetchGenericComponent from '../fetch-generic-varian-component';
import useFetch from '../use-fetch';
jest.mock('./../use-fetch');

describe('<FetchGenericComponent', () => {
    // let wrapper;
    // beforeEach(() => {
    //     wrapper = mount(<FetchGenericComponent />);
    // });
    test('FetchGerenricComponent did mount', () => {
        useFetch.mockReturnValue({
            isLoading: 'LOADING',
            error: 'sweet error',
            response: [],
        });
        const tree = renderer.create(<FetchGenericComponent title="Test" />);
        expect(tree).toMatchSnapshot();
        // const wrapper = mount(<FetchGenericComponent />);
        // expect(wrapper).toMatchSnapshot();
        // expect(wrapper.find('h3').at(0)).toBe('sweet error');
        // expect(wrapper.find('h3')).toExist();
        // expect(wrapper.find('h3')).toIncludeText('sweet');
        // console.log(wrapper.find('h3').at(0))
    });
});
// TODO: this component is to be used for search-for-doctor-form
// https://scotch.io/tutorials/create-a-custom-usefetch-react-hook
// https://rahmanfadhil.com/fetch-data-with-react-hooks/
/**
 * Was steht an? Eine Fetchmethode aussuchen. Unittests.
 * 1. Wie kann ich anbsichtlich Fehler werfen? (um zu msehen, ob verschiedene catch funktionieren)
 * 2 Pencode Beispiel suchen. Dort wurde der State mit "namen" gesetzt. Was hat es da aufsich?
 *
 */
// https://dev.to/nicomartin/how-to-test-async-react-hooks-392j
// https://dev.to/nicomartin/the-right-way-to-fetch-data-with-react-hooks-48gc
// https://medium.com/@AndreCalvo/testing-custom-react-hooks-that-use-fetch-or-other-async-functions-5fb128d07f53
// https://stackoverflow.com/questions/55047535/testing-react-components-that-fetches-data-using-hooks
// response, error, isLoading 
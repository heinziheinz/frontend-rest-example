import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter, Router, browserHistory } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import CompositionComponent from '../pagination-hook-variante';
import primeCustomerData from '../data';
describe('testing Component Atomes Components', () => {
    // console.log(primeCustomerData);
    let ObjectWrapper;
    const setState = jest.fn();
    // const useEffect = jest.spyOn(React, 'useEffect').mockImplementationOnce(f => f());
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init) => [init, setState]);
    beforeEach(() => {
        ObjectWrapper = mount(
            <MemoryRouter initialEntries={['/prime-doctor/3']}>
                <CompositionComponent data={primeCustomerData} />
            </MemoryRouter>
        );
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('ObjectHookComponent did mount', () => {
        act(() => {
            ObjectWrapper.find('.actionlink').get(0).props.onClick();
            // console.log(ObjectWrapper.find('.actionlink').get(0));
        });
        // console.log(ObjectWrapper.find("PaginationLink").get(1));
        // expect(ObjectWrapper.find("PaginationLink").get(1)).toIncludeText('1');
        expect(ObjectWrapper.find("PaginationLink").at(1)).toIncludeText('1');
        expect(setState).toHaveBeenCalledWith({ currentPage: 0, pagesCount: 1 });
        expect(setState).toHaveBeenCalled();
        expect(ObjectWrapper.find('h6')).toExist();
        expect(ObjectWrapper.find('h6')).toIncludeText('Zahnarzt');
        expect(ObjectWrapper.find('h4')).toExist();
        expect(ObjectWrapper.find('h4')).toHaveText('Frank Hutter');
        // expect(ObjectWrapper.find('p')).toExist();
        expect(ObjectWrapper.find('Link')).toExist();
        expect(ObjectWrapper.find('Card')).toExist();
        expect(ObjectWrapper.find('.data-slice')).toExist();
        expect(ObjectWrapper.find('Link')).toIncludeText('Artikel');
        expect(ObjectWrapper.find('div').at(1)).toHaveStyle('display', 'flex');
        expect(ObjectWrapper.find('CardImg').at(0)).toExist();
        console.log(ObjectWrapper.find('CardImg').get(3));
    });

    test('testing route', () => {
        act(() => {
            // ObjectWrapper.find('#danger').at(2).props().onClick();
        });
        // expect(ObjectWrapper.find('#danger')).not.toExist();

        expect(ObjectWrapper.find('#danger').at(2)).toExist();
        console.log(ObjectWrapper.find('#danger').get(2));
        expect(ObjectWrapper.find('#danger').at(2).props().href).toBe('/prime-doctor/1');
        expect(ObjectWrapper.find("SingleDoctorComponent")).toHaveLength(1);
        expect(ObjectWrapper.find("SingleDoctorComponent")).toIncludeText('Doctor');


    });
});
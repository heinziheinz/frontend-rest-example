import React from 'react';
import { mount, shallow } from 'enzyme';
import PrimeCustomer from './../prime-customer-component';
import fetchMock from "jest-fetch-mock";
const myGlobal = fetchMock;
describe('PrimeCustomer', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
    })
    xit('Prime Customer did render', () => {
        const primeCustomer = shallow(<PrimeCustomer />);
        expect(true);
    });
    xit('Prime Customer did mount', () => {
        const spy = jest.spyOn(PrimeCustomer.prototype, 'componentDidMount');
        const primeCustomer = shallow(<PrimeCustomer />);
        expect(spy).toHaveBeenCalled();
        primeCustomer.instance().inputOnClick('hallo');
    });
    xit('Did find button', () => {
        const primeCustomer = shallow(<PrimeCustomer />);
        expect(primeCustomer.find("Button")).toExist();
        primeCustomer.find("Button").simulate('click');
    });
    xit('Mocking', () => {
        global.fetch = require('jest-fetch-mock');
        beforeEach(() => {
            fetchMock.resetMocks();
        });
        afterEach(() => {
            fetchMock = myGlobal;
        });
        const primeCustomer = shallow(<PrimeCustomer />);
        // primeCustomer.instance().fetchData();
        console.log('jix');
        fetchMock.mockResponseOnce(JSON.stringify({ data: '12544' }));

        primeCustomer.instance().fetchData().then(res => {
            return res;
        }).then(res => {
            console.log(res.data);
            expect(res.data).toEqual('12544');
        }).catch(res => console.log(res));
    });
    it('Mocking sure', () => {
        const primeCustomer = mount(<PrimeCustomer />);
        expect(primeCustomer.state()).toEqual({
            name: '',
            bundesland: '',
            adresse: '',
            isLoaded: false
        });
        primeCustomer.setState({ name: 'bar', isLoaded: true });
        expect(primeCustomer.state()).toEqual({
            name: 'bar',
            bundesland: '',
            adresse: '',
            isLoaded: true
        });
    });
});
// Alle links sind auf Dropbox testen-jest-fetchmock.pages zu finden!
/**
 * Was ist heute zu tun?
 *
 */

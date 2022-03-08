import React from 'react';
import { mount, shallow } from 'enzyme';
import PrimeCustomerSearch from './../prime-customer-search-result-component';

describe('PrimeCustomerSearch search result component', () => {

    it('PrimeCustomerSearch search result', () => {
        const primeCustomerSearch = shallow(<PrimeCustomerSearch
            data={{ length: 20 }}
        />);
        console.log(primeCustomerSearch.get(0));
        expect(primeCustomerSearch.find("h1")).toHaveStyle('display', "flex");

    });
});

// Alle links sind auf Dropbox testen-jest-fetchmock.pages zu finden!
// https://reacttraining.com/react-router/web/guides/testing
// https://frontendmasters.com/courses/react-intro/testing-react-with-enzyme/
// https://medium.com/@antonybudianto/react-router-testing-with-jest-and-enzyme-17294fefd303
// https://reacttraining.com/react-router/web/guides/testing
// https://stackoverflow.com/questions/41531465/how-to-test-react-router-with-enzyme
// https://www.npmjs.com/package/react-router-enzyme-context
// https://itnext.io/react-redux-integration-tests-with-jest-enzyme-df9aa6effd13
// https://dev.to/_builtbyjay/testing-the-scrolltotop-component-in-react-with-enzyme-and-jest-3p95
// https://stackoverflow.com/questions/44309807/react-router-v4-redirect-unit-test
// https://www.rockyourcode.com/test-redirect-with-jest-react-router-and-react-testing-library/
// https://codedaily.io/tutorials/156/Test-Successful-Async-Form-Submissions-with-React-Router
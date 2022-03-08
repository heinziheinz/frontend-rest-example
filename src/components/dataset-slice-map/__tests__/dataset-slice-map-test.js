import React from 'react';
import { shallow, mount } from 'enzyme';
import Component from 'components/dataset-slice-map';

describe('<SignupComponent', () => {
    xit('first single test', () => {
        const dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
            (a, i) => "Record " + (i + 1)
        );
        const currentPage = 0;
        const pageSize = 50;
        const pagesCount = Math.ceil(dataSet.length / pageSize);
        const wrapper = shallow(<Component currentPage={currentPage} pageSize={pageSize} dataSet={dataSet} />);
    });
    it('testing style', () => {
        const dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
            (a, i) => "Record " + (i + 1)
        );
        const currentPage = 0;
        const pageSize = 50;
        const pagesCount = Math.ceil(dataSet.length / pageSize);
        const wrapper = shallow(<Component currentPage={currentPage} pageSize={pageSize} dataSet={dataSet} />);
        // expect(wrapper.find("h1")).toHaveText('Return');
        console.log(wrapper.find("div").get(0));
        expect(wrapper.find("div.joe")).toHaveStyle('display', "flex");


    });
});
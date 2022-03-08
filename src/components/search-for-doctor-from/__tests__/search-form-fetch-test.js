import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { MemoryRouter, Router, browserHistory } from 'react-router-dom';
import { shallow, mount } from 'enzyme'
import { act } from "react-dom/test-utils";
import SearchForm from "./../search-for-doctor-form";
import Data from './data';
// let container = null;
let wrapper;
const onChange = jest.fn();
const anotherOnChange = jest.fn();
const fakeUser = { name: "Joni Baez", age: "32", address: "123, Charming Avenue" };

beforeEach(() => {
    // container = document.createElement("div");
    // document.body.appendChild(container);

    wrapper = mount(
        <MemoryRouter initialEntries={["/search-result"]}>
            <SearchForm onChange={onChange} anotherOnChange={anotherOnChange} />
        </MemoryRouter>
    )
});

afterEach(() => {
    // cleanup on exiting
    // unmountComponentAtNode(container);
    // container.remove();
    // container = null;
    jest.clearAllMocks();
});
describe('hoo', () => {
    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, 'useState');
    // useStateSpy.mockImplementation((init) => [init, setState]);

    it("changes value when clicked", async () => {

        const spy = jest.spyOn(global, "fetch").mockImplementation(() => {
            console.log('have been called');
            return Promise.resolve({ json: () => Promise.resolve(Data) })
        }
        );

        act(() => {
            // render(<SearchForm onChange={onChange} anotherOnChange={anotherOnChange} />, container);
        });

        // expect(wrapper.find('PaginationResult')).toHaveLength(1);
        // get ahold of the button element, and trigger some clicks on it
        // const button = document.querySelector("Button");
        // const input = document.querySelector("Input");
        // // console.log(button);

        // expect(button.innerHTML).toBe("Submit");
        // // document.querySelector("[data-testid=toggle]");
        await act(async () => {

            wrapper.find('button').simulate('click');
            wrapper.find('input').at(0).simulate('change', { target: { name: 'searchfordoctor', value: 'Say' } });
        });

        // expect(onChange).toHaveBeenCalledTimes(1);
        // expect(anotherOnChange).toHaveBeenCalledTimes(1);
        // expect(wrapper.find('#danger').at(2)).toExist();
        // expect(wrapper.find('PaginationResult')).toHaveLength(1);
        // expect(setState).toHaveBeenCalledWith(Data);
        // expect(wrapper.find('p')).toIncludeText('Weiterleiten');


        spy.mockRestore();

    });
});

// initialEntries = { ["/search-result"]}

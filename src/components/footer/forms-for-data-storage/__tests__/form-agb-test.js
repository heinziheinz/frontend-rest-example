import { render, fireEvent, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import AGBFormComponent from '../form-agb';
import AGBStoreConfirmationComponent from 'components/footer/agb-store-confirmation-component';
const fakeData = {
    message: "Status 200",
    path: "/to-my-destination"
};

const mockFetch = (mockData) => {
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockData),
        })
    );
};
const mockFetchError = (error) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};

const mockFetchCleanUp = () => {
    global.fetch.mockClear();
    delete global.fetch;
};

describe('AGB Form Test', () => {
    xtest('AGB Form does render', () => {
        render(<AGBFormComponent />);
    });
    test("Form can be submited & input field is modifiable and redirect to form works", async () => {

        const mockSubmit = jest.fn();

        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <AGBFormComponent />
                {/* <Route path="/to-my-destination" >Book page</Route> */}
                <Route path="/to-my-destination" component={AGBStoreConfirmationComponent} />
            </Router>
        );

        fireEvent.change(getByRole("textbox", { name: "headline" }), { target: { value: 'Joe foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Text Area" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        // fireEvent.submit(queryByTestId("form"));
        fireEvent.click(getByRole("button"), { name: /submit/i });

        // Test if handleSubmit has been called 
        // expect(mockSubmit.mock.calls).toEqual([[{ name: 'Joe Doe' }]]); // Test if handleChange works
        await waitFor(() => {
            // expect(mockSubmit).toHaveBeenCalled();
            // expect(screen.getByText('hallo')).toBeInTheDocument();
            expect(screen.getByText('Status 200')).toBeInTheDocument();
            // expect(screen.getByText('Status')).toBeInTheDocument();
            // expect(container).toMatchInlineSnapshot(`<div />`);
            expect(container).toHaveTextContent(/Status 200/);
        });
        global.fetch.mockRestore();
    });
    xtest("Testing redirect", async () => {
        const mockSubmit = jest.fn();

        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));

        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole } = render(
            <Router history={history}>
                <AGBFormComponent />
            </Router>
        );
        // <Input data-testid="input-textarea" gelöscht
        fireEvent.change(queryByTestId("input-headline"), { target: { value: 'Joe foe' } }); // invoke handleChange
        fireEvent.change(queryByTestId("input-textarea"), { target: { value: 'Joe Foe' } }); // invoke handleChange
        // fireEvent.submit(queryByTestId("form"));
        fireEvent.click(getByRole("button"));

        // Test if handleSubmit has been called 
        // expect(mockSubmit.mock.calls).toEqual([[{ name: 'Joe Doe' }]]); // Test if handleChange works
        await waitFor(() => {
            // expect(mockSubmit).toHaveBeenCalled();
            expect(screen.getByText('AGB Test')).toBeInTheDocument();
            // expect(screen.getByText('error is error')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
    });
    xtest("Querying with different selectores", async () => {
        const mockSubmit = jest.fn();
        const { debug, queryByTestId, getByText, getByRole } = render(<AGBFormComponent handleSubmit={mockSubmit} />);
        fireEvent.change(getByRole("button"), { target: { value: 'Joe foe' } }); // invoke handleChange

    });
});
// https://stackoverflow.com/questions/61668195/testing-library-react-test-form-onsubmit
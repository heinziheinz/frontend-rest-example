import { render, fireEvent, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FormKontaktinsertHOCasChildUpdate from 'components/footer/forms-for-data-storage/form-kontakt-insert-hoc-as-child-update';
import KontaktStoreConfirmationComponent from 'components/footer/kontakt-store-confirmation';


const fakeData = {
    message: "Status 200",
    path: "/to-my-destination"
};
describe('<FormKontaktinsertHOCasChildUpdate/>', () => {
    test("Form can be submited & input field is modifiable and redirect to form works", async () => {
        const mockSubmit = jest.fn();

        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <FormKontaktinsertHOCasChildUpdate />
                <Route path="/to-my-destination" component={KontaktStoreConfirmationComponent} />
            </Router>
        );

        fireEvent.change(getByRole("textbox", { name: "headline" }), { target: { value: 'Joe foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Stipulation" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Email address" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Telefonnummer" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
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
});
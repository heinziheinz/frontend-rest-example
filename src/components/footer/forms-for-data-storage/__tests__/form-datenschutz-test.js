import { render, fireEvent, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FormDatenschutzComponent from '../form-datenschutz';
import DatenschutzStoreConfirmationComponent from 'components/footer/datenschutz-store-confirmation-component';
const fakeData = {
    message: "Status 200",
    path: "/to-my-destination"
};

describe('Form For Datenschutz', () => {
    xtest('Form for Datenschutz does Render', async () => {
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));
        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole } = render(
            <Router history={history}>
                <FormDatenschutzComponent />
            </Router>
        );
        fireEvent.change(getByRole("textbox", { name: "headline" }), { target: { value: 'Joe foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Text Area" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        // fireEvent.submit(queryByTestId("form"));
        fireEvent.click(getByRole("button"), { name: /submit/i });
        await waitFor(() => {
            // expect(mockSubmit).toHaveBeenCalled();
            expect(screen.getByText('AGB Test')).toBeInTheDocument();
            // expect(screen.getByText('error is error')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
    });
    test("Form can be submited & input field is modifiable and redirect to form works", async () => {
        const history = createMemoryHistory();

        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));

        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <FormDatenschutzComponent />
                <Route path="/to-my-destination" component={DatenschutzStoreConfirmationComponent} />
            </Router>
        );

        fireEvent.change(getByRole("textbox", { name: "headline" }), { target: { value: 'Joe foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Text Area" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        // fireEvent.submit(queryByTestId("form"));
        fireEvent.click(getByRole("button"), { name: /submit/i });

        await waitFor(() => {

            expect(screen.getByText('Status 200')).toBeInTheDocument();
            expect(container).toHaveTextContent(/Status 200/);
        });
        global.fetch.mockRestore();
    });
});
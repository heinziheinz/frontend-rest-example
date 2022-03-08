import { render, fireEvent, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import KontaktFormComponent from '../form-kontakt';
import KontaktStoreConfirmationComponent from 'components/footer/kontakt-store-confirmation';

const fakeData = {
    message: "Status 200",
    path: "/to-my-destination"
};


describe('Kontakt Form Test', () => {
    xtest("Form can be submited & input field is modifiable", async () => {

        const mockSubmit = jest.fn();

        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole } = render(
            <Router history={history}>
                <KontaktFormComponent />
            </Router>
        );

        fireEvent.change(screen.getByRole("textbox", { name: "headline" }), { target: { value: 'Kontakt zu Psyinfo' } }); // invoke handleChange
        fireEvent.change(screen.getByRole("textbox", { name: "Stipulation" }), { target: { value: 'Kein direkter Kontakt zu Aertzen moeglich' } }); // invoke handleChange
        fireEvent.change(screen.getByRole('textbox', { name: /email address/i }), { target: { value: 'psy-info@gmx.at' } }); // invoke handleChange
        fireEvent.change(screen.getByRole('textbox', { name: /Telefonnummer/i }), { target: { value: '01 333 888' } }); // invoke handleChange
        // fireEvent.submit(queryByTestId("form"));
        fireEvent.click(getByRole("button"), { name: /submit/i });

        // Test if handleSubmit has been called 
        // expect(mockSubmit.mock.calls).toEqual([[{ name: 'Joe Doe' }]]); // Test if handleChange works
        await waitFor(() => {
            // expect(mockSubmit).toHaveBeenCalled();
            // expect(screen.getByText('Hallo')).toBeInTheDocument();
            expect(screen.getByText('Form Test')).toBeInTheDocument();
            expect(screen.getByText('Kontakt zu Psyinfo')).toBeInTheDocument();
            expect(screen.getByText('Kein direkter Kontakt zu Aertzen moeglich')).toBeInTheDocument();
            expect(screen.getByText('psy-info@gmx.at')).toBeInTheDocument();
            expect(screen.getByText('01 333 888')).toBeInTheDocument();
            expect(screen.getByText('Data has been stored')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
    });
    test("Form can be submited & input field is modifiable and redirect to form works", async () => {
        const history = createMemoryHistory();

        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));

        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <KontaktFormComponent />
                <Route path="/to-my-destination" component={KontaktStoreConfirmationComponent} />
            </Router>
        );

        fireEvent.change(getByRole("textbox", { name: "headline" }), { target: { value: 'Joe foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Stipulation" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Email address" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        fireEvent.change(getByRole("textbox", { name: "Telefonnummer" }), { target: { value: 'Joe Foe' } }); // invoke handleChange
        // fireEvent.submit(queryByTestId("form"));
        fireEvent.click(getByRole("button"), { name: /submit/i });

        await waitFor(() => {

            expect(screen.getByText('Status 200')).toBeInTheDocument();
            expect(container).toHaveTextContent(/Status 200/);
        });
        global.fetch.mockRestore();
    });
});
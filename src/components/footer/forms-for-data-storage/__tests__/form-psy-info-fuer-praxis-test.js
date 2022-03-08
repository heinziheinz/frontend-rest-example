import { render, fireEvent, screen, waitFor, } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import PsyInfoFormComponent from '../fom-psy-info-fuer-praxis';
import PsyInfoStoreConfirmationComponent from 'components/footer/psy-info-store-confirmation';
const fakeData = {
    message: "Status 200",
    path: "/to-my-destination"
};
describe('Kontakt Form Test', () => {
    test("Form can be submited & input field is modifiable and redirect to form works", async () => {
        const history = createMemoryHistory();

        // jest.spyOn(global, "fetch").mockImplementation(() => Promise.reject({ message: 'error is error' }));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));

        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <PsyInfoFormComponent />
                <Route path="/to-my-destination" component={PsyInfoStoreConfirmationComponent} />
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
import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HOCFooterDesroyDatenschutz from '../HOC-footer-destroy-fetch-datenschutz';
import DatenschutzStoreConfirmationComponent from 'components/footer/datenschutz-store-confirmation-component';

describe('<HOC-footer-destroy-fetch-Datenschutz/>', () => {
    test('should save to localStorage', async () => {

        const fakeUser = {
            message: 'Deleted successful'
        };
        // window.localStorage.setItem('DatenschutzsLocal', JSON.stringify(fakeUser));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeUser) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <HOCFooterDesroyDatenschutz id={'1'} />
                <Route path="/to-my-destination" component={DatenschutzStoreConfirmationComponent} />
            </Router>
        );
        await waitFor(() => {
            expect(screen.getByText('Deleted successful')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
        // window.localStorage.clear();
    });
});

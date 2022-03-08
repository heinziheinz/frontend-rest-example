import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HOCFooterDesroyKontakt from '../HOC-footer-destroy-fetch-kontakt';
import KontaktStoreConfirmationComponent from 'components/footer/kontakt-store-confirmation';

describe('<HOC-footer-destroy-fetch-Kontakt/>', () => {
    test('should save to localStorage', async () => {

        const fakeUser = {
            message: 'Deleted successful'
        };
        // window.localStorage.setItem('KontaktsLocal', JSON.stringify(fakeUser));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeUser) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <HOCFooterDesroyKontakt id={'1'} />
                <Route path="/to-my-destination" component={KontaktStoreConfirmationComponent} />
            </Router>
        );
        await waitFor(() => {
            expect(screen.getByText('Deleted successful')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
        // window.localStorage.clear();
    });
});

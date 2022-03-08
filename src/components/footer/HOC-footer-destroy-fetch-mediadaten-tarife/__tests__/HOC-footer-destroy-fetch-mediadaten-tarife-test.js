import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HOCFooterDesroyMediaTarife from '../HOC-footer-destroy-fetch-mediadaten-tarife';
import MediaTarifeStoreConfirmationComponent from 'components/footer/mediadaten-tarife-store-confirmation-component';

describe('<HOC-footer-destroy-fetch-MediaTarife/>', () => {
    test('should save to localStorage', async () => {

        const fakeUser = {
            message: 'Deleted successful'
        };
        // window.localStorage.setItem('MediaTarifesLocal', JSON.stringify(fakeUser));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeUser) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <HOCFooterDesroyMediaTarife id={'1'} />
                <Route path="/to-my-destination" component={MediaTarifeStoreConfirmationComponent} />
            </Router>
        );
        await waitFor(() => {
            expect(screen.getByText('Deleted successful')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
        // window.localStorage.clear();
    });
});

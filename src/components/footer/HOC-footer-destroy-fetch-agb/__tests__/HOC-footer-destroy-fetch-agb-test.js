import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HOCFooterDesroyAGB from '../HOC-footer-destroy-fetch-agb';
import AGBStoreConfirmationComponent from 'components/footer/agb-store-confirmation-component';

describe('<HOC-footer-destroy-fetch-agb/>', () => {
    test('should save to localStorage', async () => {

        const fakeUser = {
            message: 'Deleted successful'
        };
        // window.localStorage.setItem('AGBsLocal', JSON.stringify(fakeUser));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeUser) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <HOCFooterDesroyAGB id={'1'} />
                <Route path="/agb-form/agbs-deleted" component={AGBStoreConfirmationComponent} />
            </Router>
        );
        await waitFor(() => {
            expect(screen.getByText('Deleted successful')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
        // window.localStorage.clear();
    });
});

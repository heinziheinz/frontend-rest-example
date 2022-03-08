import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import HOCFooterDesroyFQA from '../HOC-footer-destroy-fetch-fqa';
import FQAStoreConfirmationComponent from 'components/footer/fqa-aertze-store-confirmation-component';

describe('<HOC-footer-destroy-fetch-FQA/>', () => {
    test('should save to localStorage', async () => {

        const fakeUser = {
            message: 'Deleted successful'
        };
        // window.localStorage.setItem('FQAsLocal', JSON.stringify(fakeUser));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeUser) }));
        const history = createMemoryHistory();
        const { debug, queryByTestId, getByText, getByRole, container } = render(
            <Router history={history}>
                <HOCFooterDesroyFQA id={'1'} />
                <Route path="/to-my-destination" component={FQAStoreConfirmationComponent} />
            </Router>
        );
        await waitFor(() => {
            expect(screen.getByText('Deleted successful')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
        // window.localStorage.clear();
    });
});

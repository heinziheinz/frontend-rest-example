import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import HOCstore from '../HOC-footer-store-fetch-agb';
describe('HOC-footer-store-fetch-agb', () => {
    xtest('does it render', () => {
        render(<HOCstore />);
    });
    test('should save to localStorage', async () => {
        const url = process.env.REACT_APP_URL + 'api/agbs/agbs';
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            // signal: mySignal
        }
        const fakeData = {
            headline: "FAQ für ÄrztInnen",
            blockoftext: `<h2>Some Caption</h2><p>Die AGB finden auch dann Anwendung.</p><p>Some more more.</p><h2>Second Caption</h2><p>Die AGB finden auch dann Anwendung.</p>`
        };
        window.localStorage.setItem('AGBsLocal', JSON.stringify(fakeData));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));
        render(<HOCstore />);
        await waitFor(() => {
            expect(screen.getByText(fakeData.headline)).toBeInTheDocument();
            expect(screen.getByText('Second Caption')).toBeInTheDocument();
            expect(screen.getByText('• Die AGB finden auch dann Anwendung.')).toBeInTheDocument();
            // expect(2 + 2).toBe(4);
            // expect(screen.getByText("Was kostet mich der Eintrag auf DocFinder?")).toBeInTheDocument();
            // fakeUser.subheadline.forEach((data) => {
            //     // console.log(data);
            //     expect(screen.getByText(data)).toBeInTheDocument();
            // });
        });
        global.fetch.mockRestore();
        window.localStorage.clear();

    });
});
// | POST      | api/agbs/agbs
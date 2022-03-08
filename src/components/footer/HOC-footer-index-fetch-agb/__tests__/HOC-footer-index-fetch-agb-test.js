import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import HOCstore from '../HOC-footer-index-fetch-agb';
// import 'jest-localstorage-mock';
describe('HOC-footer-index-fetch-agb', () => {
    xtest('should save to localStorage', () => {
        console.log('global.localStorage');
        // console.log(global.localStorage);
        window.localStorage.setItem('the-key', 'value');

        expect(window.localStorage.getItem('the-key')).toEqual('value');
        expect(window.localStorage.getItem.length).toBe(1);
        render(<HOCstore />);
        // const KEY = 'foo';
        // const VALUE = 'bar';
        // dispatch(action.update(KEY, VALUE));
        // expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
        // expect(localStorage.__STORE__[KEY]).toBe(VALUE);
        // expect(Object.keys(localStorage.__STORE__).length).toBe(1);
        window.localStorage.clear();
    });
    test('should save to localStorage', async () => {
        const url = process.env.REACT_APP_URL + 'api/fqa/fqa';
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
        const fakeUser = {
            headline: "FAQ für ÄrztInnen",
            subheadline: [
                "Was kostet mich der Eintrag auf DocFinder?",
                "Was ist PSyFinder?",
                "Woher stammen meine Daten?",
                "Warum veröffentlicht PsyFinder meine Daten ohne meine Zustimmung ?",
                "Meine Daten sind nicht aktuell! Wie kann ich meine Daten aktualisieren?",
                "Wie kann ich als Arzt einen Eintrag auf PsyFinder bekommen?"
            ],
            'captions': null,
            // 'blockoftext': [BlockOfText],
            'tablecontent': 'Hietzinger Hauptstraße 50 1130 Wien / Österreich',
        };
        window.localStorage.setItem('AGBsLocal', JSON.stringify(fakeUser));
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeUser) }));
        render(<HOCstore />);
        await waitFor(() => {
            expect(screen.getByText(fakeUser.headline)).toBeInTheDocument();
            expect(screen.getByText("Was kostet mich der Eintrag auf DocFinder?")).toBeInTheDocument();
            fakeUser.subheadline.forEach((data) => {
                // console.log(data);
                expect(screen.getByText(data)).toBeInTheDocument();
            });
        });
        global.fetch.mockRestore();
        window.localStorage.clear();
    });
});
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import HOCupdate from '../HOC-footer-update-fetch-datenschutz';
describe('HOC-footer-store-fetch-agb', () => {
    xtest('does it render', () => {
        render(<HOCupdate />);
    });
    xtest('mock fetch', async () => {
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
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeUser) }));
        render(<HOCupdate />);
        await waitFor(() => {
            expect(screen.getByText('hallo')).toBeInTheDocument();
            // expect(screen.getByText("Was kostet mich der Eintrag auf DocFinder?")).toBeInTheDocument();
            // expect(screen.getByText("Meine Daten sind nicht aktuell! Wie kann ich meine Daten aktualisieren?")).toBeInTheDocument();
        });
        global.fetch.mockRestore();
    });
    xtest('should save to localStorage', () => {

    });
});
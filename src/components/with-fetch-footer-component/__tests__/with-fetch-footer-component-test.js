import React from 'react';
// import { renderHook } from '@testing-library/react-hooks';
import { render, screen, waitFor } from '@testing-library/react';
import WithFetchFooterComponent from '../with-index-fetch-footer-component';
import AGB from 'components/footer/agb-component';
// import { BlockOfText } from 'components/footer/';

describe('testing with-fetch-footer-component', () => {
    test('testing agb-components data structure', async () => {
        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            // signal: this.mySignal
        }
        const Wrapper = {
            fetch: WithFetchFooterComponent(AGB, process.env.REACT_APP_URL + 'api/agbs/agbs', option)
        };
        const url = process.env.REACT_APP_URL + 'api/fqa/fqa';

        const fakeData = {
            headline: "FAQ für ÄrztInnen",
            subheadline: [
                "Was kostet mich der Eintrag auf DocFinder?",
                "Was ist PSyFinder?",
                "Woher stammen meine Daten?",
                "Warum veröffentlicht PsyFinder meine Daten ohne meine Zustimmung ?",
                "Meine Daten sind nicht aktuell! Wie kann ich meine Daten aktualisieren?",
                "Wie kann ich als Arzt einen Eintrag auf PsyFinder bekommen?"
            ],
            captions: null,
            // 'blockoftext': [BlockOfText],
            tablecontent: 'Hietzinger Hauptstraße 50 1130 Wien / Österreich',
        };
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(fakeData) }));
        render(<Wrapper.fetch mio={'say mio'} />);
        await waitFor(() => {
            // expect(screen.getByText(fakeData.headline)).toBeInTheDocument();
            expect(screen.getByText('hallo')).toBeInTheDocument();
        });
        global.fetch.mockRestore();
    });
});
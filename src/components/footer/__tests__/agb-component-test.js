import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import AGBComponent from 'components/footer/agb-component';
describe('agb-component.jsx', () => {
    xtest('agb did mount', () => {
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
            blockoftext: `<h2>Some Caption</h2><p>Die AGB finden auch dann Anwendung.</p><p>Some more more.</p><h2>Second Caption</h2><bulletpoints>Soso</bulletpoints>`
        };
        render(<AGBComponent data={fakeData} />);
        // fakeData.subheadline.forEach((data) => {
        //     expect(screen.getByText(data)).toBeInTheDocument();
        // });
        expect(screen.getByText('Some Caption')).toBeInTheDocument();
        expect(screen.getByText('Die AGB finden auch dann Anwendung.')).toBeInTheDocument();
        // expect(screen.getByText('So')).toBeInTheDocument();
    });

    test('speicherbestätigun bei store funktion', () => {
        const fakeData = {
            headline: "Daten wurden gespeichert",
            // blockoftext: null
        };
        render(<AGBComponent data={fakeData} />);
        // fakeData.subheadline.forEach((data) => {
        //     expect(screen.getByText(data)).toBeInTheDocument();
        // });
        expect(screen.getByText(fakeData.headline)).toBeInTheDocument();
        // expect(screen.getByText(null)).toBeInTheDocument();
        // expect(screen.getByText('So')).toBeInTheDocument();
    });
});
/**
 * Data structure:
 * Headline
 * blockoftext: subheadline, bulletpoints,
 */
import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import ImpressumComponent from 'components/footer/impressum-component';
describe('datenschutz-component.jsx', () => {
    xtest('does datenschutz-component render', () => {
        render(<ImpressumComponent />);
        expect(screen.getByText('props.data')).toBeInTheDocument
    });
    test('fake Data', () => {
        const fakeData = {
            headline: "Datenschutz",
            blockoftext: `<h2>Some Caption</h2><facts>Some block of text is really important for you</facts>`
        };
        render(<ImpressumComponent data={fakeData} />);
        expect(screen.getByText(fakeData.headline)).toBeInTheDocument();
        expect(screen.getByText('Some Caption')).toBeInTheDocument();
        expect(screen.getByText('Some block of text is really important for you')).toBeInTheDocument();
        // expect(screen.getByText('Blur')).toBeInTheDocument();
    });
});
/**
 * Teststructure:
 * Headline
 * blockoftext:Subheadline, Captions, facts
 */
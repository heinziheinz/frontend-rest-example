import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import MediadatenTarife from 'components/footer/mediadaten-tarife';
describe('datenschutz-component.jsx', () => {
    xtest('does datenschutz-component render', () => {
        render(<MediadatenTarife />);
        expect(screen.getByText('props.data')).toBeInTheDocument
    });
    test('fake Data', () => {
        const fakeData = {
            headline: "Datenschutz",
            subheadline: "Some subheadline",
            blockoftext: `<h2>Some Caption</h2><h3>Some Subheadline</h3><h4>Captions over and over</h4><facts>Some bulletpoint</facts>`
        };
        render(<MediadatenTarife data={fakeData} />);
        // expect(screen.getByText('props.data')).toBeInTheDocument
        expect(screen.getByText(fakeData.headline)).toBeInTheDocument
        expect(screen.getByText(fakeData.subheadline)).toBeInTheDocument
        expect(screen.getByText('Some Caption')).toBeInTheDocument
        expect(screen.getByText('Some Subheadline')).toBeInTheDocument
        expect(screen.getByText('Captions over and over')).toBeInTheDocument
        expect(screen.getByText('Some bulletpoint')).toBeInTheDocument
    });
});
/**
 * Teststructure:
 * Headline
 * Subheadline
 * Captions
 * facts
 */
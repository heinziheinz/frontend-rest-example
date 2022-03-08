import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import DatenschutzComponente from 'components/footer/datenschutz-component';
describe('datenschutz-component.jsx', () => {
    xtest('does datenschutz-component render', () => {
        render(<DatenschutzComponente />);
        expect(screen.getByText('props.data')).toBeInTheDocument
    });
    test('fake Data', () => {
        const fakeData = {
            headline: "Datenschutz",
            blockoftext: `<h2>Some Caption</h2><h3>Some Subheadline</h3><h4>Captions over and over</h4><bulletpoints>Some bulletpoint</bulletpoints><p>Soso</p>`
        };
        render(<DatenschutzComponente data={fakeData} />);
        // expect(screen.getByText(fakeData.headline)).toBeInTheDocument
        expect(screen.getByText('Some Caption')).toBeInTheDocument
        expect(screen.getByText('Some Subheadline')).toBeInTheDocument
        expect(screen.getByText('Captions over and over')).toBeInTheDocument
        expect(screen.getByText('• Some bulletpoint')).toBeInTheDocument
        expect(screen.getByText('Soso')).toBeInTheDocument
    });
});
/**
 * Teststructure:
 * Headline
 * blockoftext:Subheadline, Captions, Bulletpoints
 */
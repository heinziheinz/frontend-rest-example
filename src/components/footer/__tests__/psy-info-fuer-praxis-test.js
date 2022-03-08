import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import PsyInfoFuerPraxisComponent from 'components/footer/psy-info-fuer-praxis';
describe('datenschutz-component.jsx', () => {
    test('does datenschutz-component render', () => {
        const fakeData = {
            headline: "Präsentieren Sie sich auf Psy Online",
            subheadline: "Zur Zeit gibt es noch keine....",
        };
        render(<PsyInfoFuerPraxisComponent data={fakeData} />);
        expect(screen.getByText(fakeData.headline)).toBeInTheDocument
    });
});
/**
 * Die Struktur für diese Komponente ist noch nicht klar:
 * Deshalbs ist hier nur ein einfach render Test
 */
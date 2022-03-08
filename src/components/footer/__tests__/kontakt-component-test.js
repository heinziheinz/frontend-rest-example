import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import KontaktComponent from 'components/footer/kontakt-component';
import { BlockOfText } from './block-of-text';


describe('KOntakt Component', () => {
    test('Kontakt Component des render', () => {
        const fakeData = {
            headline: "Kontaktaufnahme mit Psy Online",
            blockoftext: `<h2>Kontakt</h2><h3>Some Subheadline</h3><h4>Captions over and over</h4><bulletpoints>Some bulletpoint</bulletpoints>`
        };
        render(<KontaktComponent data={fakeData} />)
        expect(screen.getByText(fakeData.headline)).toBeInTheDocument();
    });
});

/**
 * Kontaktaufnahme mit Psy Online
 *
 *Wenn Sie uns eine Emal schreiben wollen: psyfinder@gmx.at
 Telefonisch erreichen Sie uns unter: 0650 888 888 9
 */
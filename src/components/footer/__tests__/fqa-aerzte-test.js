import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import FQAfuerAerzte from 'components/footer/fqa-aertze';
import { BlockOfText } from './block-of-text';

describe('FQA tests', () => {


    test('does fqa-arzte render', () => {
        const url = process.env.REACT_APP_URL + 'api/fqa/fqa';
        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', "X-Requested-With": "XMLHttpRequest"
            },
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            // signal: mySignal
        }
        const fakeData = {
            headline: "Datenschutz",
            blockoftext: `<h2>Some Caption</h2><h3>Some Subheadline</h3><h4>Captions over and over</h4><bulletpoints>Some bulletpoint</bulletpoints>
            <p>Say something</p>`
        };


        render(<FQAfuerAerzte data={fakeData} />);


        // expect(screen.getByText(fakeUser.headline)).toBeInTheDocument();
        expect(screen.getByText(fakeData.headline)).toBeInTheDocument();
        // expect(screen.getByText("Some Caption")).toBeInTheDocument();
        expect(screen.getByText("Captions over and over")).toBeInTheDocument();
        expect(screen.getByText("Say something")).toBeInTheDocument();
        expect(screen.getByText("• Some bulletpoint")).toBeInTheDocument();

    });
});
/**
 * headline
 * blockoftext: subheadline, caption, paragrap, bullets
 */
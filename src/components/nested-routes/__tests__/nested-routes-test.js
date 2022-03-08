import React from 'react';
// import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import ReactNestedRoutes from '../nested-routes';
import { fireEvent, render } from '@testing-library/react';
import { withRouter } from 'react-router'
import { MemoryRouter } from "react-router-dom";
import { fakeData } from './../fake-data-from-fetch';
import { StructuringStartPageComponent } from './../structuring-start-page-component';
beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() => {
        // console.log('jest mock');
        return Promise.resolve({ json: () => Promise.resolve(fakeData) })
    }
    );
});

describe('ReactNestedRouts', () => {
    xtest('component did mount', async () => {

        const { container, getByText } = render(
            <MemoryRouter>
                <ReactNestedRoutes />
            </MemoryRouter>
        );
        // console.log(container.innerHTML);
        expect(container.innerHTML).toMatch('You are HomeOfPsychology');
    });
    test('component does Click', async () => {
        // console.log(fakeData);
        const { container, getByText } = render(
            <ReactNestedRoutes />
            , { wrapper: MemoryRouter }
        );
        // await act(async () => {
        //     await fireEvent.click(getByText(/gesundheitsratgeber/i));
        // });

        await act(async () => {
            fireEvent.click(getByText(/gesundheitsratgeber/i));
            // console.log('so called');
        });
        // expect(container.innerHTML).toMatch('see some blood');
        // expect(container.innerHTML).toMatch('Give em some bloodspin until you win');
        expect(container.innerHTML).toMatch('Gesundheitsnews');
        expect(container.innerHTML).toMatch('my new head');
        expect(container.innerHTML).toMatch('crazy Zeit');
        expect(container.innerHTML).toMatch('funky head');
        expect(container.innerHTML).toMatch('subheadline');
        expect(container.innerHTML).toMatch('Husten und Schnupfen lösen');

        act(() => {
            fireEvent.click(getByText(/Suche Deinen Psychologen/i));
            // console.log('so called');
        });
        expect(container.innerHTML).toMatch('You are HomeOfPsychology');

    });
    xtest('component does Click', () => {
        // console.log(fakeData);
        const data = {
            blockoftext: '<h2>say something</h2>',
            captions: "headline",
            category: "main",
            confirmed: 1,
            created_at: "2020-02-14 13::10:35",
            headline: "headline",
            id: 1,
            imagelink: ["storage/article/headline/800xbaby30303_.jpg"],
            subheadline: "subheadline",
            updated_at: "2020-02-14 13::10:35"
        }
        const { container, getByText } = render(
            <StructuringStartPageComponent data={data} />
        );
        expect(container.innerHTML).toMatch('headline');
    });
});

// https://testing-library.com/docs/example-react-router
// https://testing-library.com/docs/guide-which-query
// style:
// react testing lib testing lazy load:
// https://medium.com/@the_teacher/how-to-test-a-react-components-css-styles-with-react-testing-library-rtl-styled-components-43f744334528
// https://spectrum.chat/testing-library/general/react-testing-library-with-react-lazy-and-suspense~2e121f83-6bf4-431a-8bc2-648983b1e8c5
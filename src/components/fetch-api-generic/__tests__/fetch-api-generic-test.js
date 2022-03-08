import React from 'react';
import PostList from './../fetch-api-generic';
import renderer from 'react-test-renderer';
import useApi from './../useApi';

jest.mock('./../useApi');

describe('PostList Snapshots', () => {
    it('loading renders correctly', () => {
        useApi.mockReturnValue({
            state: 'LOADING',
            error: '',
            data: [],
        });
        const tree = renderer.create(<PostList title="Test" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('success renders correctly', () => {
        useApi.mockReturnValue({
            state: 'SUCCESS',
            error: '',
            data: [
                {
                    title: 'Hello',
                }, {
                    title: 'World',
                }
            ],
        });
        const tree = renderer.create(<PostList title="Test" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('error renders correctly', () => {
        useApi.mockReturnValue({
            state: 'ERROR',
            error: 'General Error',
            data: [],
        });
        const tree = renderer.create(<PostList title="Test" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
import React from 'react';
import { shallow, mount } from 'enzyme';
import { MyButtonCollection } from './../button-collection';
import { JestEnvironment } from '@jest/environment';
import { prototype } from 'events';
describe('<MyButtonCollection />', () => {

    xit('component does mount', () => {
        const spy = jest.spyOn(MyButtonCollection.prototype, 'componentDidMount');
        const clickSpy = jest.fn();
        const wrapper = shallow(<MyButtonCollection clickSpy={clickSpy} />);
        wrapper.instance().handle('hallo');
        expect(clickSpy).toHaveBeenCalledWith('hallo');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
    it('component`s button does work', () => {
        const spy = jest.spyOn(MyButtonCollection.prototype, 'componentDidMount');
        const clickSpy = jest.fn();
        const wrapper = shallow(<MyButtonCollection clickSpy={clickSpy} />);
        wrapper.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(clickSpy).toHaveBeenCalledWith(undefined);
        expect(wrapper).toHaveStyle('display', 'flex');
        expect(wrapper).toIncludeText('Click');

        spy.mockRestore();
    });
});
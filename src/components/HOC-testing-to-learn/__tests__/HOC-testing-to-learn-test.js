import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import MyComponent, { DisplaySearchResults } from './../display-search-results';
describe('testing logging in HOC', () => {
    it('does MyComponent mount', () => {
        sinon.spy(MyComponent.prototype, 'componentDidMount');
        const wrapper = mount(<MyComponent />);
        expect(MyComponent.prototype.componentDidMount).to.have.property('callCount', 1);
        MyComponent.prototype.componentDidMount.restore();
    });
    it('clickevent', () => {
        const wrapper = mount(<MyComponent />)
        wrapper.find('button').simulate('click');
    });
});
//testing Wrapped Component directly
describe('testing wrapped component', () => {
    it('some test', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<DisplaySearchResults onClick={onButtonClick} />);
        wrapper.find('button').simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
        sinon.assert.calledOnce(onButtonClick);//that`s sinon own assersions
    });
    it('sinon  assert', () => {
        const onButtonClick = sinon.spy();
        const wrapper = shallow(<DisplaySearchResults onClick={onButtonClick} />);
        wrapper.find('button').simulate('click');
        // sinon.assert.calledOnce(onButtonClick);
        // assert(onButtonClick.calledOnce);
        expect(onButtonClick.calledOnce);//funktioniert nicht, bräuchte Plug in
    });
});
describe('subing query call', () => {
    it('did query work', () => {
        var stub = sinon.stub();
        stub('hello');
        console.log(stub.firstCall.args); //output: ['hello']
    });
});
describe('stub for fetch', () => {
    it('testing stub', () => {
        const wrapper = shallow(<MyComponent />);
        const callback = sinon.spy();
        const component = wrapper.instance();
        // let handleSubmitStub = sinon.stub(component, 'handlerChanger', () => { });
        let handleSubmitStub = sinon.stub(component, 'handlerChanger').callsFake();
        handleSubmitStub.yields();
        handleSubmitStub(callback);
        handleSubmitStub.restore();
        sinon.assert.calledOnce(callback);
    });
    it('stubing complete fetch', () => {
        //this test doesn`t work completely
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
            json: () => mockJsonPromise,
        });
        var post = sinon.stub(global, 'fetch').callsFake(() => mockFetchPromise);
        const wrapper = shallow(<MyComponent />);
        wrapper.instance().handlerChanger();
        expect(global.fetch).to.have.property('callCount', 1);
        expect(global.fetch).to.have.property("ambient-supplementerapi/password/create");
    });

});



//next sinon stubbing fetch
//einfach und verständlich erklärt:
// https://github.com/airbnb/enzyme/issues/586
// https://www.sitepoint.com/sinon-tutorial-javascript-testing-mocks-spies-stubs/
// https://solidgeargroup.com/unit-tests-javascript-sinon/
//testing fetch
// https://sinonjs.org/how-to/
// http://www.wheresrhys.co.uk/fetch-mock/
// hier für jest, um fetch zu mocken:
// https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167

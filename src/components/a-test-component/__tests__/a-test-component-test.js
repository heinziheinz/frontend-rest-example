import { render, screen } from '@testing-library/react';
import { shallow, mount } from 'enzyme';
// import App from '/../a-test-component';
import ATestComponent from 'components/a-test-component';
function sum(a, b) {
    return a + b;
}

function EmptyRenderFixture() {
    return null;
}

function NonEmptyRenderFixture() {
    return (
        <div>
            <EmptyRenderFixture />
        </div>
    );
}
describe('some tests', () => {
    test('renders learn react link', () => {
        render(<ATestComponent />);
        const linkElement = screen.getByText(/learn react/i);
        expect(linkElement).toBeInTheDocument();
    });
    test('more tests', () => {
        expect(sum(1, 2)).toBe(3);
    });
    test('enzyme test', () => {
        const wrapper = mount(<ATestComponent bar="baz" />);
        expect(wrapper.props().bar).toBe('baz');
    });
    test('testing jest-enzyme', () => {
        const wrapper = mount(<EmptyRenderFixture />); // mount/render/shallow when applicable
        expect(wrapper.find('EmptyRenderFixture')).toBeEmptyRender();
    });
});
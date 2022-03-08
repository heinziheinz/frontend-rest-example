import React, { Component } from 'react';


const TestSubject = (n, p) => {
    return (
        n + p
    );
}
const ComponentTestSubject = (pros) => {
    return (
        <h1>Lime</h1>
    );
}

//Some Tests with ...
class User extends React.Component {
    render() {
        return (
            <span>User {this.props.index}</span>
        )
    }
}
class Fixture extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><User index={1} /></li>
                    <li>
                        <User index={2} />
                        <User index={3} />
                    </li>
                </ul>
            </div>
        )
    }
}
function Multi() {
    return (
        <div>
            <span className="foo" />
            <span className="bar baz" />
        </div>
    );
}

class MyClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mySweet: 'test'
        }
    }
    submit = () => {
        console.log('stuff has been submitted');
        this.setState({ mySweet: 'mySweet' });
        return <h1>hi</h1>;
    }
    componentDidMount() {
        console.log('component did mount');
    }
    render() {
        return (
            <button onClick={this.props.onButtonClick}>Press me</button>
        );
    }
}
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', shit: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log('did mount');
        // this.prop.myStump();
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleAnother = (event) => {
        this.setState({ shit: event.target.value });
    }

    handleSubmit(event) {
        console.log('handleSubmit has been clicked');
        event.preventDefault();
        this.setState({
            value: 'submitted'
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <input type="text" value={this.state.shit} onChange={this.handleAnother} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
const NestedFormToTest = () => {
    return (
        <div>
            <form>
                <label>
                    Name:
          <input type="text" />
                </label>
                <label>
                    Name:
          <input type="text" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

// check out some nested interaction
const FormGroup = (prop) => {
    return (
        <div>{prop.children}</div>
    );
}
const TextInput = ({ placeholder, value, onChange, ref }) => (
    <input
        type='text'
        ref={ref}
        className='form-control'
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
);

const ItemFilter = ({ onFilter }) => {
    return (<div className='list-item-filters'>
        <FormGroup>
            <TextInput
                placeholder='Search for items...'
                onChange={e => onFilter('query', e.target.value)} />
        </FormGroup>
        <FormGroup>
            <TextInput
                placeholder='Search for items...'
                onChange={e => onFilter('query', e.target.value)} />
        </FormGroup>
    </div>);
}

const Button = (props) => {
    return (
        <SecondButton onButtonClick={props.onButtonClick} />
    );
}
const SecondButton = (props) => {
    return (
        <div><button>click</button></div>
    );
}

export {
    ComponentTestSubject,
    Fixture,
    User,
    Multi,
    MyClass,
    NameForm,
    ItemFilter,
    TextInput,
    FormGroup,
    NestedFormToTest,
    Button,
    SecondButton
};
export default TestSubject;
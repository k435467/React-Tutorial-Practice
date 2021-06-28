# My notes

Practice the tutorial that is on the Reactjs website. [link to tutorial](https://reactjs.org/tutorial/tutorial.html)

`src/index.js`

- [My notes](#my-notes)
  - [State and Lifecycle](#state-and-lifecycle)
    - [Lifecycle Methods](#lifecycle-methods)
    - [State Updates May Be Asynchronous](#state-updates-may-be-asynchronous)
  - [Handling Events](#handling-events)
    - [Binding](#binding)
      - [public class fields syntax](#public-class-fields-syntax)
      - [call bind in ctr](#call-bind-in-ctr)
      - [use an arrow function in the callback](#use-an-arrow-function-in-the-callback)
  - [Conditional Rendering](#conditional-rendering)
    - [Element Variables](#element-variables)
    - [Inline If with Logical && Operator](#inline-if-with-logical--operator)
    - [Inline If-Else with Condition Operator](#inline-if-else-with-condition-operator)
    - [Preventing Component from Rendering](#preventing-component-from-rendering)
  - [List and Keys](#list-and-keys)
  - [Forms](#forms)
  - [Composition vs Inheritance](#composition-vs-inheritance)
    - [Containment](#containment)
  - [Thinking in React](#thinking-in-react)
  - [-----------](#-----------)
  - [Accessibility](#accessibility)
    - [Programmatically managing focus](#programmatically-managing-focus)
    - [Mouse and pointer events](#mouse-and-pointer-events)
  - [Context](#context)
  - [Fragments](#fragments)
  - [Uncontrolled Components](#uncontrolled-components)
  - [Hooks](#hooks)
    - [Using the State Hook](#using-the-state-hook)
    - [Using the Effect Hook](#using-the-effect-hook)
      - [Skipping Effects](#skipping-effects)
    - [Rules of Hooks](#rules-of-hooks)
    - [useCallback()](#useCallback())

## State and Lifecycle

### Lifecycle Methods

```jsx
// clock ticks every second
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  // NOTE:
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  // NOTE:
  // componentDidUpdate() {}

  // NOTE:
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("root"));
```

### State Updates May Be Asynchronous

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
```

## Handling Events

### Binding

#### public class fields syntax

```jsx
class LoggingButton extends React.Component {
  // NOTE: experimental syntax.
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

#### call bind in ctr

```jsx
class LoggingButton extends React.Component {
  constructor(props) {
    super(props);
    // NOTE:
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

#### use an arrow function in the callback

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return (
      // NOTE: performance problem
      <button onClick={() => this.handleClick()}>Click me</button>
    );
  }
}
```

## Conditional Rendering

### Element Variables

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  // NOTE:
  let el = <GuestGreeting />;
  if (isLoggedIn) {
    el = <UserGreeting />;
  }

  return {
    <div>{el}</div>
  }
}
```

### Inline If with Logical && Operator

```jsx
/*
NOTE:
true && expression always evaluates to expression 
false && expression always evaluates to false
*/
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}
```

### Inline If-Else with Condition Operator

{ condition ? true : false }

### Preventing Component from Rendering

Returning null. The lifecycle mehtods will still be called.

## List and Keys

1. Loop through a array using map().
2. Key should be specified inside the array.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  );
}
```

## Forms

```js
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // NOTE:
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
}
```

## Composition vs Inheritance

### Containment

1. the children prop
2. pass React elements as prop

```js
function FancyBorder(props) {
  return <div className={"FancyBorder FancyBorder-" + props.color}>{props.children}</div>;
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <p>Something</p>
    </FancyBorder>
  );
}
```

## Thinking in React

1. Break The UI Into A Component Hierarachy
2. Build A Static Version in React
3. Identify The Minimal Representation Of UI State
   1. Think of all of the pieces of data
   2. Passed in from a parent via **props**, then it isn't state.
   3. Remain **unchanged** over time, then it isn't state.
   4. Can be **computed** from any other state or props, then it isn't state.
4. Identify Where Your State Should Live
5. Add Inverse Data Flow: Callbacks

## -----------

## Accessibility

### Programmatically managing focus

Modify the HTML DOM may cause to keyboard focus being lost or set to an unexpected element.

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element
    this.textInput = React.createRef();
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return <input type="text" ref={this.textInput} />;
  }
}
```

Sometimes a parent component needs to set focus to an element in a child component. We can do this by exposing DOM refs through prop.

### Mouse and pointer events

Attaching a click event to the window object that closes the popover.

```jsx
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  // NOTE:
  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // NOTE:
  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```

More: onBlur and onFocus.

## Context

- React.createContext

  ```js
  export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
  });
  ```

- Context.Provider

  ```jsx
  <MyContext.Provider value={/* some value */}>
  ```

- Class.contextType

  ```js
  class MyClass extends React.Component {
    render() {
      let value = this.context;
      /* render something based on the value of MyContext */
    }
  }
  MyClass.contextType = MyContext;

  // experimental: public class fields syntax
  class MyClass extends React.Component {
    static contextType = MyContext;
    render() {
      let value = this.context;
      /* render something based on the value */
    }
  }
  ```

- Context.Consumer

  ```jsx
  <MyContext.Consumer>
    {value => /* render something based on the context value */}
  </MyContext.Consumer>
  ```

## Fragments

Group a list of children without adding extra nodes to the DOM.

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}

// Keyed Fragments
function Glossary(props) {
  return (
    <dl>
      {props.items.map((item) => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

## Uncontrolled Components

use a ref to get form values from the DOM.

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" ref={this.fileInput} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

## Hooks

### Using the State Hook

```jsx
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}></button>;
}
```

### Using the Effect Hook

The componentDidMount and componentDidUpdate would block the browser from updating the screen. useEffect did not. **useLayoutEffect** did.

```js
useEffect(() => {
  // DidMount and DidUpdate
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  // WillUnmount
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

#### Skipping Effects

Passing an empty array([]) will make effect run and clean it up only once.

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes (!==)
```

### Rules of Hooks

- Only call Hooks **at the top level**. Don't call Hooks inside loops, conditions, or nested function.
- Only call Hooks **from React function components**. Don't call Hooks from regular JavaScript functinos. (except for custom Hooks.)

### useCallback()

```jsx
// Will not change unless `a` or `b` changes
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```
Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

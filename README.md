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
  - [Context](#context)
  - [Uncontrolled Components](#uncontrolled-components)
  - [Hooks](#hooks)

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

Returning null instead of its render output. Note that the component's lifecycle mehtods will still be called.

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

Use the children prop to pass children elements directly into their output. Or pass React elements as props like any other data, because they are just objects.

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

## Context

## Uncontrolled Components

## Hooks

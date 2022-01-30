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
  - [Optimizing Performance](#optimizing-performance)
    - [PureComponent: memo()](#purecomponent-memo)
    - [useMemo()](#usememo)
    - [useCallback()](#usecallback)
  - [Render Props](#render-props)
  - [------------](#------------)
  - [Hooks](#hooks)
    - [State Hook](#state-hook)
    - [Effect Hook](#effect-hook)
      - [Skipping Effects](#skipping-effects)
    - [Rules of Hooks](#rules-of-hooks)
    - [Fetch Data](#fetch-data)
    - [Additional Hooks: useRef](#additional-hooks-useref)
    - [Additional Hooks: useImperativeHandle](#additional-hooks-useimperativehandle)

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

ReactDOM.render(<Clock />, document.getElementById('root'));
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
    console.log('this is:', this);
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
    console.log('this is:', this);
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
    console.log('this is:', this);
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
    const value = target.type === 'checkbox' ? target.checked : target.value;
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
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
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
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  }

  // NOTE:
  onClickOutsideHandler(event) {
    if (
      this.state.isOpen &&
      !this.toggleContainer.current.contains(event.target)
    ) {
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

When the value of Context.Provider changes, the consumers must re-render. Object.is() is used to determine the value changes or not.

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

## Optimizing Performance

- memo(): component
- useMemo(): object
- useCallback(): function

### PureComponent: memo()

If a **component** renders the same result given the same **props**, then wrap it with memo() to skip rendering. Only checks for prop changes. It will still rerender when state or context change.

```jsx
// React.memo()
const Title = React.memo((props) => {
  console.log('Render title component');
  return (
    <div>
      <h1>Counter</h1>
      <h5>{props.n}</h5>
    </div>
  );
});
```

Second argument areEqual(prevProps, nextProps).

```jsx
const Title = React.memo(
  () => {
    /* ... */
  },
  // second argument areEqual(prevProps, nextProps)
  (prevProps, nextProps) => {
    console.log(prevProps, nextProps);
    return false; // false for render
  }
);
```

### useMemo()

Wrap **object** with useMemo() to prevent reders caused by a new object reference.

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);
  // useMemo()
  const titleContent = useMemo(() => ({ name: "counter" }), []);

  return (
    <div>
      <!-- pass object to Title -->
      <Title title={titleContent} />
      <span>{`current count：${count}`}</span>
      <button
        type="button"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};
```

### useCallback()

Wrap **function** with useCallback() to prevent reders caused by a new function reference.

```jsx
// Will not change unless `a` or `b` changes
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

The code below would not work. Because the count is initialized to 0, it always returns 1.

```jsx
// Wrong

const Counter = () => {
  const [count, setCount] = useState(0);
  const titleContent = useMemo(() => ({ name: '計數器' }), []);
  // useCallback()
  const addCount = useCallback(() => {
    setCount(count + 1);
  }, []);

  return (
    <div>
      <Title title={titleContent} />
      <span>{`目前計數：${count}`}</span>
      <AddCountButton addCount={addCount} />
    </div>
  );
};
```

Correct: setCount receives the current count as an param.

```jsx
// Correct

const addCount = useCallback(() => {
  setCount((count) => count + 1);
}, []);
```

## Render Props

```tsx
const SomeBox = ({ children }: { children: (data: string) => JSX.Element }) => {
  const [data, setData] = useState<string>('12345678');
  return <div>{children(data)}</div>;
};

const App = () => {
  return (
    <div>
      <SomeBox>
        {(data) => (
          <>
            <p>{data}</p>
            <p>{data}</p>
            <p>{data}</p>
          </>
        )}
      </SomeBox>
    </div>
  );
};
```

## ------------

## Hooks

### State Hook

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}></button>;
}
```

Functional updates: the state is guaranteed to be up-to-date.

```jsx
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <!-- Functional updates -->
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

### Effect Hook

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

### Fetch Data

[Article](https://www.robinwieruch.de/react-hooks-fetch-data/).

- A async function returns an implicit promise. However, and effect hook should return nothing or a clean up function. Use **nested function definitions** and then call the sub functions to workaround it.
- Use the **second argument of useEffect** to trigger fetching when event fires such as input.

Custom data fetching hook:

```js
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

function App() {
  const [query, setQuery] = useState('redux');
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    'https://hn.algolia.com/api/v1/search?query=redux',
    { hits: [] }
  );

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
```

Reducer hook for data fetching and abort data fetching in effect hook:

```js
const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};
```

### Additional Hooks: useRef

```tsx
const MyComponent = () => {
  /* ... */

  console.log('rendered!');
  const done = useRef<boolean>(false);
  useEffect(() => {
    if (!done.current) {
      console.log('not done!');
      done.current = true;
    }
  });

  /* ... */
};
```

### Additional Hooks: useImperativeHandle

useImperativeHandle customizes the instance value that is exposed to parent components when using ref.

```tsx
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './App.css';

interface BlueBoxProps {
  onClick: () => void;
}

interface BlueBoxRefObject {
  inc: () => void;
}

const BlueBox: React.ForwardRefRenderFunction<
  BlueBoxRefObject,
  BlueBoxProps
> = ({ onClick }, ref) => {
  const [num, setNum] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    inc: () => {
      setNum((v) => v + 1);
    },
  }));

  return (
    <div className="box blue">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num}
      </button>
      <button onClick={onClick}>onClick</button>
    </div>
  );
};

const ImperativeBlueBox = forwardRef(BlueBox);

// -----

interface GreenBoxProps {
  name: { firstName: string; lastName: string };
}

const GreenBox = ({ name }: GreenBoxProps) => {
  const [num, setNum] = useState<number>(0);

  const onClick = () => {
    setNum((v) => v + 1);
  };

  const blueBoxRef = useRef<BlueBoxRefObject>(null);

  return (
    <div className="box green">
      <button
        onClick={() => {
          setNum((v) => v + 1);
        }}
      >
        {num} {JSON.stringify(name)}
      </button>
      <button onClick={blueBoxRef.current?.inc}>inc on BlueBox</button>
      <ImperativeBlueBox ref={blueBoxRef} onClick={onClick} />
    </div>
  );
};
```

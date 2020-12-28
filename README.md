# My notes

Practice the tutorial that is on the Reactjs website. [link to tutorial](https://reactjs.org/tutorial/tutorial.html)

`src/index.js`

## State and Lifecycle

- Lifecycle Methods

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

- State Updates May Be Asynchronous

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

- Binding

  - public class fields syntax

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

  - call bind in ctr

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

  - use an arrow function in the callback

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

- Element Variables

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

- Inline If with Logical && Operator

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

- Inline If-Else with Condition Operator: { condition ? true : false }

- Preventing Component from Rendering: Returning null instead of its render output. Note that the component's lifecycle mehtods will still be called.

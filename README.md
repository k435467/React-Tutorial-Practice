# My notes

Practice the tutorial that is on the Reactjs website. [link to tutorial](https://reactjs.org/tutorial/tutorial.html)

```src/index.js```

- State updates may be asynchronous

  ```js
  // Wrong
  this.setState({
    counter: this.state.counter + this.props.increment,
  });

  // Correct
  this.setState((state, props) => ({
    counter: state.counter + props.increment
  }));
  ```

- Binding

  - public class fields syntax

    ```jsx
    class LoggingButton extends React.Component {
      // experimental syntax.
      handleClick = () => {
          console.log('this is:', this);
      }

      render() {
        return (
            <button onClick={this.handleClick}>
              Click me
            </button>
        );
      }
    }
    ```

  - call bind in ctr

    ```jsx
    class LoggingButton extends React.Component {
      constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick() {
          console.log('this is:', this);
      }

      render() {
          return (
            <button onClick={this.handleClick}>
              Click me
            </button>
        );
      }
    }
    ```

  - use an arrow function in the callback

    ```jsx
    class LoggingButton extends React.Component {
      handleClick() {
        console.log('this is:', this);
      }

      render() {
        return (
          // performance problem
          <button onClick={() => this.handleClick()}>
            Click me
          </button>
        );
      }
    }
    ```

import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange(e) {
    this.setState({ text: e.target.value });
    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = { text: this.state.text, id: Date.now() };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Timer />
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.text} />
        </form>
      </div>
    );
  }
}

class TodoList extends Component {
  handleStar(e) {
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
            <li key={item.id}>{item.text}<a onClick={this.handleStar}>star</a></li>
          ))}
      </ul>
    );
  }
}

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  render() {
    return (
      <div>{this.state.date.toLocaleTimeString()}</div>
    );
  }
}

export default App;

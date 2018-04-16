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
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = { text: this.state.text, id: Date.now() };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }

  handleaStar(e) {
    var stared = this.state.items.find(item => item.stared || false);
    
  }

  render() {
    return (
      <div>
        <Timer interval={1} />
        <Timer interval={2} />
        <Timer interval={5} />
        <TodoList items={this.state.items} />
        <div>Star Count: {this.state.starCount}</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.text} />
        </form>
      </div>
    );
  }
}

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.handleStar = this.handleStar.bind(this);
  }

  handleStar(e) {
    console.log(this);
  }

  render() {
    return (
      <ul>{
        this.props.items.map((todoItem) => (
          // <li key={todoItem.id}>{todoItem.text}<a onClick={this.handleStar}>❤</a></li>
          <TodoItem value={todoItem} />
        ))
      }</ul>
    );
  }
}

function TodoItem(props) {
  var todoItem = props.value;
  return (
    <li key={todoItem.id}>{todoItem.text}<a onClick={this.handleStar}>❤</a></li>
  );
}

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date(), interval: Number.parseInt(props.interval, 10) };
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), this.state.interval * 1000);
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

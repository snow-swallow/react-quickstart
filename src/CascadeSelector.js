import React, {Component} from 'react';

// const DATA = {
//   a1: {
//     b1: ["c1", "c2", "c3"],
//     b2: ["c4", "c5", "c6"]    
//   },
//   a2: {
//     b3: ["c7", "c8"],
//     b4: ["c9", "c10", "c11"]
//   },
//   a3: {
//     b5: ["c12", "c13"]
//   }
// };

const Data = [{
  l1: 'a1', l2: 'b1', l3: 'c1'
}, {
  l1: 'a1', l2: 'b1', l3: 'c2'
}, {
  l1: 'a1', l2: 'b2', l3: 'c3'
}, {
  l1: 'a2', l2: 'b3', l3: 'c4'
}, {
  l1: 'a2', l2: 'b4', l3: 'c5'
}]
class CascadeSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {preSelected: []};
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e, level) {
    console.log('__handleSelect__', e.target.value, level);
    if (level === 1) {
      this.setState({preSelected: [e.target.value]});
    } else if (level === 2) {
      this.setState((prevState) => ({preSelected: prevState.preSelected.push(e.target.value)}));
    } else if (level === 3) {
      console.log('l3');
    }
  }

  render() {
    return (
      <div>
        <LevelSelector level="1" preSelected={this.state.preSelected} handleSelect={this.handleSelect} />
        <LevelSelector level="2" preSelected={this.state.preSelected} handleSelect={this.handleSelect} />
        <LevelSelector level="3" preSelected={this.state.preSelected} handleSelect={this.handleSelect} />
      </div>
    );
  };
}
class LevelSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {level: Number.parseInt(props.level, 10), preSelected: props.preSelected};
  }
  filterOptions(level, preSelected) {
    let opts = [];
    Data.forEach(item => {
      if (level === 1) {
        opts.push(item.l1);
      } else if (level === 2) {
        if (preSelected && preSelected.length === 1 && item.l1 === preSelected[0]) {
          opts.push(item.l2);
        }
      } else if (level === 3) {
        if (preSelected && preSelected.length === 2 && item.l1 === preSelected[0] && item.l2 === preSelected[1]) {
          opts.push(item.l3);
        }
      }
    });
    return Array.from(new Set(opts));
  }
  render() {
    let options = this.filterOptions(this.state.level, this.state.preSelected);
    console.log(this.state, options);
    return (
      <div>
        <label htmlFor="level-">Level {this.state.level}</label>
        <select className={this.state.level} onChange={(e) => this.props.handleSelect(e, this.state.level)}>
          {
            options.map(item => {
              return <option key={this.state.level + "_" + item + "_" + new Date().getTime()} value={item}>{item}</option>
            })
          }
        </select>
      </div>
    );
  };

}


export default CascadeSelector;
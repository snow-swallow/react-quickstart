import React, {Component} from 'react';

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
class CascadeSelector2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionsL1: this.getOptions(1, []),
      optionsL2: [],
      optionsL3: [],
      selectedL1: "",
      selectedL2: "",
      selectedL3: ""
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e, level) {
    let currentSelected = e.target.value;
    if (level === 1) {
      this.setState({
        optionsL2: this.getOptions(2, [currentSelected]),
        optionsL3: [],
        selectedL1: currentSelected,
        selectedL2: "",
        selectedL3: ""
      });
    } else if (currentSelected.length > 0 && level === 2) {
      this.setState(prevState => ({
        optionsL3: this.getOptions(3, [prevState.selectedL1, currentSelected]),
        selectedL2: currentSelected,
        selectedL3: ""
      }));
    } else if (currentSelected.length > 0 && level === 3) {
      console.log('change l3 to ', currentSelected);
    }
  }

  getOptions(level, preSelected) {
    let opts  = [];
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
    return (
      <div>
        <LevelSelector level={1} options={this.state.optionsL1} selectedOpt={this.state.selectedL1} handleSelect={this.handleSelect} />
        <LevelSelector level={2} options={this.state.optionsL2} selectedOpt={this.state.selectedL2} handleSelect={this.handleSelect} />
        <LevelSelector level={3} options={this.state.optionsL3} selectedOpt={this.state.selectedL3} handleSelect={this.handleSelect} />
      </div>
    );
  };
}
class LevelSelector extends Component {
  render() {
    return (
      <div>
        <label htmlFor="level-">Level {this.props.level}</label>
        <select 
          className={this.props.level} 
          onChange={(e) => this.props.handleSelect(e, this.props.level)}
          value={this.props.selectedOpt}>
          {
            this.props.options.map(item => {
              return <option 
                key={this.props.level + "_" + item + "_" + new Date().getTime()} 
                value={item} 
              >{item}</option>
            })
          }
        </select>
      </div>
    );
  };

}


export default CascadeSelector2;
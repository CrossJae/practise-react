import React, { Component, PropTypes } from 'react';
import { EventEmitter } from 'events';//nodejs的events模块

const emitter = new EventEmitter();// 单例

class ListItem extends Component {
  constructor(props){
    super(props);

  }
  render(){
    return(
      <li>
        <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
        <span>{this.props.value}</span>
      </li>
    )
  }
}
ListItem.defaultProps = {
  checked: false,
  value: 'test'
}

class List extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: this.props.list.map(entry => ({
        text: entry.text,
        checked: entry.checked || false,
      })),
    }
  }
  onItemChange(entry){
    console.log('onitem')
    const {list} = this.state;
    this.setState({
      list: list.map( prevEntry => ({
        text: prevEntry.text,
        checked: prevEntry.text === entry.text ? !prevEntry.checked : prevEntry.checked,
      }))
    });
    // 之前 this.props.handleItemChange(entry);
    // ItemChange是什么函数？
    emitter.emitEvent('ItemChange',entry);
  }
  render(){
    return(
      <div>
        <ul>
          {this.state.list.map( (entry, index) => (
            <ListItem
              key={`list-index`}
              value={entry.value}
              checked={entry.checked}
              onChange={this.onItemChange.bind(this, entry)}
             />
          ))}
        </ul>
      </div>
    )
  }
}
export default List;

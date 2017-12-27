import React, { Component } from 'react';

class ListItem extends Component {
  render(){
    const { value } = this.props;
    return(
      <li style={{background: this.context.color}}>
        <span>{value}</span>
      </li>
    )
  }
}
// important 3
ListItem.contextTypes = {
  color: React.PropTypes.string
}

class List extends Component {
  // important 1
  getChildContext(){
    return(
      {color: 'red',}
    )
  }
  render(){
    const {list} = this.props;
    return(
      <ul>
        {
          list.map( (entry, index) => (
            <ListItem
              key={`list-${index}`}
              value={entry.text}
            />
          ))
        }
      </ul>
    )
  }
}

// important 2
List.childContextTypes = {
  color: React.PropTypes.string,
}

export default List;

import React, { Component } from 'react';

// function ListItem( {view} ){
//   return (
//     <li>
//       <span>{view}</span>
//     </li>
//   )
// }
//
// function List( { list, title} ){
//   return (
//     <div>
//       <ListItem value={entry.text} />
//     </div>
//   )
// }

// ListItem
class ListItem extends Component {
  // 使用babel的es6方法不支持静态属性
  // static defaultProps = {
  //   text: '',
  //   checked: false,
  // }
  render(){
    console.log(this.props.checked)
    return (
      <li>
        <input type="checkbox" checked={this.props.checked}
          onChange={this.props.onChange} />
        <span>{this.props.value}</span>
      </li>
    )
  }
}
ListItem.defaultProps = {
  text: '',
  checked: false,
}

// List
class List extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: this.props.list.map(entry => ({
          text: entry.text,
          checked: entry.checked,
      }))
    }
    console.log(this.state.list)
  }
  // 向子组件传递的函数
  onItemChange(entry){
    console.log('entry', entry)
    const {list} = this.state;
    this.setState({
      list: list.map(prevEntry => ({
        text: prevEntry.text,
        checked: prevEntry.text === entry.text ? !prevEntry.checked : prevEntry.checked
      }))
    })
    // 向父组件的函数传递 important
    this.props.handleItemChange(entry);
  }
  render(){
    return(
      <div>
        <ul>
          { this.state.list.map( (entry, index) => (
            <ListItem
              key={`list-${index}`}
              value={entry.text}
              checked={entry.checked}
              onChange={this.onItemChange.bind(this, entry)}
              // 每次改变传入每条entry数据
             />
          ) ) }
        </ul>
      </div>
    )
  }
}
// 默认参数，这样是不是就可以不用写 if(xxx) {return}了?!, 可以容错用？
List.defaultProps = {
  list: [
    {text: 3},
    {text: 4}
  ],
  handleItemChange: () => {},
}
export default List;

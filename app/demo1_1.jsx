import React, { Component } from 'react';
import List from './demo1_2.jsx';

// 总组件
export default class App extends Component {
  constructor(props){
    super(props);
    // 绑定了一个事件
    this.handleItemChange = this.handleItemChange.bind(this);
  }
  // important
  handleItemChange(item){
    console.log(item);
  }

  render(){
    return(
      // 引入子组件，给子组件传入handleItemChange方法
      <List
        list={[{text:1}, {text:2}]}
        handleItemChange={this.handleItemChange}
      />
    )
  }
}

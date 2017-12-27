import React, { Component } from 'react';
import { EventEmitter } from 'events';//nodejs的events模块

import List from './demo3_2';
const emitter = new EventEmitter();// 单例

export default class App extends Component {
  componentDidMount(){
    this.itemChange = emitter.addListener('ItemChange', (msg, data) => {
      console.log(data);
    });
  }
  // important
  componentWillUpMount(){
    // 卸载事件
    emitter.removeListener(this.itemChange);

  }
  render(){
    return(
      <List list={[{text:1}, {text:2}]} />
    )
  }
}

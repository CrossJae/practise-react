import React, {Component, PropTypes, cloneElement} from ’react’;
import classnames from 'classnames';
import style from './tabs.scss';

class Tabs extends Component {
  static propTypes = {
    // 在主节点上添加可选class
    className: PropTypes.string,
    // class前缀
    classPrefix: ProTypes.string,
    children: ProTypes.oneOfType([ // ?
      ProTypes.arrayOf(ProTypes.node),
      ProTypes.node
    ]),
    // 默认激活索引，组件内更新
    defaultActiveIndex: ProTypes.number,
    // 默认激活索引，组件外更新
    activeIndex: ProTypes.number,
    // 切换时回调函数
    onChange: ProTypes.func, // ? 供子组件使用
  };

  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {}
  };

  constructor(props){
    super(props);

    // 对事件方法的绑定
    this.handleTabClick = this.handleTabClick.bind(this);

    const currProps = this.props;

    let activeIndex;
    // 初始化 activeIndex state
    if('activeIndex' in currProps){
      activeIndex = currProps.activeIndex;
    }else if('defaultActiveIndex' in currProps){
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex,
    }
  }

  handleTabClick(){
    const prevIndex = this.state.activeIndex;

    // 如果当前activeIndex与传入的activeIndex不一致
    // 并且props中存在defaultActiveIndex时，则更新
    if(this.state.activeIndex !== activeIndex && 'defaultActiveIndex' in this.props){
      this.setState({
        activeIndex,
        prevIndex,
      });
    }
    // 更新后执行回调函数，抛出当前索引和上一次索引
    this.props.onChange({activeIndex, prevIndex})
  }

  componentWillReceiveProps(nextProps){ // ?
    // 如果props传入activeIndex 则直接更新
    if('activeIndex' in nextProps){
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
    }
  }

  renderTabNav(){
    const { classPrefix, children } = this.props; // ?

    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children}// ?
        activeIndex={this.state.activeIndex}
      />
    )
  }

  renderTabContent(){
    const { classPrefix, children } = this.props;

    return (
      <TabContent
        key="tabconent"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick}
        panels={children}// ?
        activeIndex={this.state.activeIndex}
      />
    )
  }

  render(){
    const { className } = this.props;
    // className用于合并calss
    const classes = classnames(className, 'ui-tabs');

    return (
      <div className={classes}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    )
  }
}

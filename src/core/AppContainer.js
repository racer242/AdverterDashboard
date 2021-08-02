import React, { Component } from 'react';
import Dashboard from '../components/Dashboard';

class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  componentDidMount() {
    this.unsubscribe=this.store.subscribe(()=>{this.onStoreChange()});
    this.mounted=true;
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.mounted=false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  onStoreChange() {
    if (this.mounted) {
      let state=this.store.getState();
      this.setState(state);
    }
  }

  render() {

    let children = [];
    children.push(this.props.children);

    children.push(
      <Dashboard
        key="dashboard"
        store={this.props.store}
      />
    );

    return React.createElement(
      'div',
      { id:'AppContainer',
      },
      children
    );
  }
}

export default AppContainer;

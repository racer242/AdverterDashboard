import React, { Component } from 'react';

import mainReducer from './reducers/mainReducer'
// import settings from './configuration/Settings';
import Container from './core/Container';

import DataManager from './core/DataManager';
// import Dispatcher from './core/Dispatcher';
import Control from './core/Control';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { appInit, getViewStatusFromHash } from './actions/appActions';

import WindowActivity from './components/WindowActivity'
import { initHash } from './core/helpers'

import './css/containers.css';
import './css/menu.css';
import './css/buttons.css';
import './css/app.css';

const Store = createStore(
  mainReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };

    this.initHandler=this.initHandler.bind(this);
    this.resizeHandler=this.resizeHandler.bind(this);

    initHash(()=>{
      Store.dispatch(
        getViewStatusFromHash()
      );
    });

  }

  updateLayout() {
    let windowInnerWidth=document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
    let windowInnerHeight=document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight;

    this.setState({
      ...this.state,
      windowWidth:windowInnerWidth,
      windowHeight:windowInnerHeight,
    });

  }

  initHandler(event) {
    this.updateLayout();
  }

  resizeHandler(event) {
    this.updateLayout();
  }

  componentDidMount() {

    Store.dispatch(
      appInit()
    );

    window.addEventListener("load",this.initHandler);
    window.addEventListener("resize",this.resizeHandler);
  }

  render() {
    return (
      <Provider store={Store}>
        <Container
          id="Container"
          windowWidth={this.state.windowWidth}
          windowHeight={this.state.windowHeight}
          store={Store}
        >
          <DataManager
            store={Store}
          />
          <Control
            store={Store}
          />
        </Container>
        <WindowActivity
          store={Store}
        />
      </Provider>
    );
  }

}

export default App;

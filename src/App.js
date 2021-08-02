import React, { Component } from 'react';

import settings from './configuration/Settings';

import AppContainer from './core/AppContainer';
import DataManager from './core/DataManager';
import Control from './core/Control';

import mainReducer from './reducers/mainReducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { appInit, getViewStatusFromHash } from './actions/appActions';
import { initHash } from './core/helpers'


import './css/containers.css';
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
        <AppContainer
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
        </AppContainer>
      </Provider>
    );
  }

}

export default App;

//
// <Container
//   id="Container"
//   windowWidth={this.state.windowWidth}
//   windowHeight={this.state.windowHeight}
//   store={Store}
// >
//   <DataManager
//     store={Store}
//   />
//   <Control
//     store={Store}
//   />
// </Container>
// <WindowActivity
//   store={Store}
// />
//

//
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }
//
// export default function App() {
//   return (
//     <Container maxWidth="sm">
//       <Box my={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Create React App v4-beta example
//         </Typography>
//         <ProTip />
//         <Copyright />
//       </Box>
//       <Dashboard/>
//     </Container>
//   );
// }

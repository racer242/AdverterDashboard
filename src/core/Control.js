import { Component } from 'react';
import settings from '../configuration/Settings'

import {
  loadStoreData,
  saveStorageData,
  waitingForReloadStoreData,
 } from '../actions/appActions';

class Control extends Component {

  //--------------------------------------------------------------------------
	//
	// Constructor
	//
	//--------------------------------------------------------------------------

  constructor(props) {
    super(props);
    this.state = {};
    this.store = this.props.store;
  }


  //--------------------------------------------------------------------------
  //
  // React methods
  //
  //--------------------------------------------------------------------------

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

  //--------------------------------------------------------------------------
  //
  // Own methods
  //
  //--------------------------------------------------------------------------

  onStoreChange() {
    if (this.mounted) {
      let state=this.store.getState();
      this.setState(state);
      if (state.dataLoaded) {
          this.waitForReload(settings.reloadTimeout);
      } else
      if (state.loadDataError) {
        this.waitForReload(settings.loadTimeout);
      }
    }
  }

  stopTimeout() {
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout)
      this.loadTimeout=null;
    }
  }

  waitForReload(timeout) {
    this.store.dispatch(
      waitingForReloadStoreData()
    );
    this.stopTimeout();
    this.loadTimeout=setTimeout(()=>{
      this.store.dispatch(
        loadStoreData()
      );
    },timeout);
  }

  render () {
    return null;
  }

}

export default Control;

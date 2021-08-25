import { Component } from 'react';

import settings from '../configuration/Settings';
import { setStoreData, loadStoreDataError } from '../actions/appActions';

class DataManager extends Component {

  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      isLoading:false,
      isLoaded:false,
    }
    this.loader=null;
    this.result=null;
  }

/* ++++ React methods ++++ */

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

  componentDidUpdate(prevProps, prevState) {
  }

  onStoreChange() {
    if (this.mounted) {
      let state=this.store.getState();
      if (state.loadData) {
        this.load()
      }
    }
  }

  loadJSON(fileName,callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', fileName, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4 && xobj.status === 200) {
        callback(xobj.responseText,null);
      } else
      if (xobj.status !== 200) {
        callback(xobj.responseText,xobj);
      }
    };
    xobj.send(null);
  }

  onDataLoad(data) {
    this.setState(
      {
        ...this.state,
        isLoading:false,
        isLoaded:true,
      }
    )
    let processedData=this.processData(data);
    this.store.dispatch(
      setStoreData(processedData)
    );
  }

  onDataLoadError(error) {
    this.setState(
      {
        ...this.state,
        isLoading:false,
        isLoaded:false,
      }
    )
    this.store.dispatch(
      loadStoreDataError()
    );
  }

  load() {
    if (this.state.isLoading) return;
    this.setState(
      {
        ...this.state,
        isLoading:true,
        isLoaded:false,
      }
    )
    this.loadJSON(settings.source,(data,error) => {
      if (error) {
        this.onDataLoadError(error);
      } else {
        this.onDataLoad(data);
      }
    });
  }

  processData(stringData)
  {
    let data=JSON.parse(stringData);
    return {
      ...data,
    }
  }

  render () {
    return null;
  }

}
export default DataManager;

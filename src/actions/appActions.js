export const appInit = () => {
  return {
    type: 'APP_INIT',
  }
}

export const setStoreData = (data) => {
  return {
    type: 'SET_STORE_DATA',
    data:{
      ...data,
      dataLoaded:true,
      loadData:false,
      loadDataError:false,
    },
  }
}

export const loadStoreDataError = (data) => {
  return {
    type: 'LOAD_STORE_DATA_ERROR',
    data:{
      ...data,
      dataLoaded:false,
      loadData:false,
      loadDataError:true,
    },
  }
}

export const loadStoreData = () => {
  return {
    type: 'LOAD_STORE_DATA',
    data:{
      dataLoaded:false,
      loadData:true,
      loadDataError:false,
    },
  }
}

export const waitingForReloadStoreData = () => {
  return {
    type: 'WAITING_FOR_RELOAD_STORE_DATA',
    data:{
      dataLoaded:false,
      loadDataError:false,
    },
  }
}

export const setAppData = (data) => {
  return {
    type: 'SET_APP_DATA',
    data,
  }
}

export const getViewStatusFromHash = () => {
  return {
    type: 'GET_VIEW_STATUS_FROM_HASH',
    data:{
    }
  }
}

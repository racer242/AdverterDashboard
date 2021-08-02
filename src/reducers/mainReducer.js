import settings from './../configuration/Settings'
import { hashIsEmpty, updateViewStatusFromHash, updateHashFromViewStatus } from './../core/helpers'
let mainReducerController = (state={}, action) => {

    // console.log("mainReducer",action);

    switch (action.type) {

      case 'APP_INIT': {
        return {
          ...state,
          ...settings.defaultState,
        }
      }

      case 'APP_LOADING': {
        return {
          ...state,
        }
      }

      case 'APP_START': {
        return {
          ...state,
        }
      }

      case 'GET_VIEW_STATUS_FROM_HASH': {
        let newState={
          ...state,
          ...action.data,
        }
        newState.viewStatus=updateViewStatusFromHash(settings.defaultState.viewStatus);
        return newState;
      }

      case 'SAVE_STORAGE_DATA':
      case 'WAITING_FOR_RELOAD_STORE_DATA':
      case 'SET_STORE_DATA':
      case 'LOAD_STORE_DATA':
      case 'LOAD_STORE_DATA_ERROR':
      case 'RELOAD_STORE_DATA': {
        return {
          ...state,
          ...action.data,
        }
      }

      default:
        return state
    }
}

const mainReducer = (state={}, action) => {

  if (action.extraAction) {
    state = mainReducer(state,action.extraAction);
  }

  state = mainReducerController(state,action);

  return state;
}


export default mainReducer

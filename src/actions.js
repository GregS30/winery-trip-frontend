import AdapterWine from './adapters/AdapterWine'

import {LOGIN, LOGOUT, STORE_MY_WINERIES, STORE_NAME_SEARCH, STORE_SELECTED_REGION, STORE_SELECTED_GRAPE, STORE_WINERY_DETAILS, STORE_WINERY_WINES, REQUEST_WINERIES, RECEIVE_WINERIES
} from './types';

export function login(username, userId) {
  return {
    type: LOGIN,
    payload: {
      username: username,
      userId: userId,
      loggedIn: true,
    }
   }
}

export function logout() {
  return {
    type: LOGOUT,
   }
}

export function storeMyWineries(myWineries) {
  console.log("storeMyWineries", myWineries)
  return {
    type: STORE_MY_WINERIES,
    payload: {
      myWineries: myWineries,
    }
  }
}

export function storeNameSearch(nameSearch) {
  return {
    type: STORE_NAME_SEARCH,
    payload: {
      nameSearch: nameSearch,
    }
  }
}

export function storeSelectedRegion(region) {
  console.log("action", region)
  return {
    type: STORE_SELECTED_REGION,
    payload: {
      region: region,
    }
  }
}

export function storeSelectedGrape(grape) {
  console.log("action", grape)
  return {
    type: STORE_SELECTED_GRAPE,
    payload: {
      grape: grape,
    }
  }
}

export function storeWineryDetails(details, winery) {
  return {
    type: STORE_WINERY_DETAILS,
    payload: {
      details: details,
      winery: winery,
    }
  }
}

export function storeWines() {
  return {
    type: STORE_WINERY_WINES,
   }
}

export function requestWineries() {
  return {
    type: REQUEST_WINERIES,
  }
}

export function receiveWineries(json) {
  return {
    type: RECEIVE_WINERIES,
    payload: {
      wineries: json,
    }
  }
}

export function getWineries(region, grape) {
  return (dispatch) => {
    dispatch(requestWineries());
    AdapterWine.fetchWineries(region, grape)
    .then(json => dispatch(receiveWineries(json)))
  }
}

import {LOGIN, LOGOUT, STORE_WINERIES, STORE_MY_WINERIES, STORE_NAME_SEARCH, STORE_SELECTED_REGION, STORE_SELECTED_GRAPE, STORE_WINERY_DETAILS, STORE_WINERY_WINES, STORE_SELECTED_WINERY
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
  return {
    type: STORE_MY_WINERIES,
    payload: {
      myWineries: myWineries,
    }
  }
}

export function storeWineries(wineries) {
  return {
    type: STORE_WINERIES,
    payload: {
      wineries: wineries,
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

export function storeSelectedRegion(selectedRegion) {
  return {
    type: STORE_SELECTED_REGION,
    payload: {
      selectedRegion: selectedRegion,
    }
  }
}

export function storeSelectedGrape(selectedGrape) {
  return {
    type: STORE_SELECTED_GRAPE,
    payload: {
      selectedGrape: selectedGrape,
    }
  }
}

export function storeSelectedWinery(selectedWinery) {
  return {
    type: STORE_SELECTED_WINERY,
    payload: {
      selectedWinery: selectedWinery,
    }
  }
}

export function storeWineryDetails(wineryDetails) {
  return {
    type: STORE_WINERY_DETAILS,
    payload: {
      wineryDetails: wineryDetails,
    }
  }
}

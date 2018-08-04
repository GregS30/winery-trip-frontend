import {LOGIN, LOGOUT, MY_WINERIES, ALL_WINERIES, NAME_SEARCH, SELECTED_REGION, SELECTED_GRAPE, WINERY_DETAILS, WINERY_WINES, SELECTED_WINERY
} from './types';

export function login(username, userId, loggedIn) {
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

export function myWineries(myWineries) {
  return {
    type: MY_WINERIES,
    payload: {
      myWineries: myWineries,
    }
  }
}

export function allWineries(allWineries) {
  return {
    type: ALL_WINERIES,
    payload: {
      wineries: allWineries,
    }
  }
}

export function nameSearch(nameSearch) {
  return {
    type: NAME_SEARCH,
    payload: {
      nameSearch: nameSearch,
    }
  }
}

export function selectedRegion(selectedRegion) {
  return {
    type: SELECTED_REGION,
    payload: {
      selectedRegion: selectedRegion,
    }
  }
}

export function selectedGrape(selectedGrape) {
  return {
    type: SELECTED_GRAPE,
    payload: {
      selectedGrape: selectedGrape,
    }
  }
}

export function selectedWinery(selectedWinery) {
  return {
    type: SELECTED_WINERY,
    payload: {
      selectedWinery: selectedWinery,
    }
  }
}

export function wineryDetails(wineryDetails) {
  return {
    type: WINERY_DETAILS,
    payload: {
      wineryDetails: wineryDetails,
    }
  }
}

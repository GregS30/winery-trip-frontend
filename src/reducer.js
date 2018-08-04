import {LOGIN, LOGOUT, MY_WINERIES, ALL_WINERIES, NAME_SEARCH, SELECTED_REGION, SELECTED_GRAPE, WINERY_DETAILS, WINERY_WINES, SELECTED_WINERY
} from './types';

//default State
const initialState = {
  // App
  username: "",   // also Login
  password: "",   // only Login
  userId: null,
  loggedIn: false,
  myWineries: [],

  //  WineryContainer
  wineries: [],

  wineryDetails: null,  // also TripContainer

  nameSearch: "",
  selectedRegion: "Napa Valley",
  selectedGrape: "Merlot",

  selectedWinery: null,     // also TripContainer

  // WinesList
  wines: null,


}

export default function reducer(state = initialState, action) {
switch(action.type) {
    case LOGIN:
      return { ...state,
        username: action.payload.username,
        userId: action.payload.userId,
        loggedIn: true}
      case LOGOUT:
        return { ...state,
          username: "",
          userId: null,
          loggedIn: false}
      case MY_WINERIES:
        return { ...state,
          myWineries: action.payload.myWineries,
        }
      case ALL_WINERIES:
        return { ...state,
          wineries: action.payload.myWineries,
        }
      case NAME_SEARCH:
        return { ...state,
          nameSearch: action.payload.nameSearch,
        }
      case SELECTED_REGION:
        return { ...state,
          selectedRegion: action.payload.selectedRegion,
        }
      case SELECTED_GRAPE:
        return { ...state,
          selectedGrape: action.payload.selectedGrape,
        }
      case SELECTED_WINERY:
        return { ...state,
          selectedWinery: action.payload.selectedWinery,
        }
      case WINERY_DETAILS:
        return { ...state,
          wineryDetails: action.payload.wineryDetails,
        }
      default:
        return state;
  }
}

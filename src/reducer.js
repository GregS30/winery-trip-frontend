import {LOGIN, LOGOUT, STORE_MY_WINERIES, STORE_WINERIES, STORE_NAME_SEARCH, STORE_SELECTED_REGION, STORE_SELECTED_GRAPE, STORE_WINERY_DETAILS, STORE_WINERY_WINES, STORE_SELECTED_WINERY
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
    case STORE_WINERIES:
      return { ...state,
        wineries: action.payload.wineries,
    }
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
    case STORE_MY_WINERIES:
      return { ...state,
        myWineries: action.payload.myWineries,
      }
    case STORE_NAME_SEARCH:
      return { ...state,
        nameSearch: action.payload.nameSearch,
      }
    case STORE_SELECTED_REGION:
      return { ...state,
        selectedRegion: action.payload.selectedRegion,
      }
    case STORE_SELECTED_GRAPE:
      return { ...state,
        selectedGrape: action.payload.selectedGrape,
      }
    case STORE_SELECTED_WINERY:
      return { ...state,
        selectedWinery: action.payload.selectedWinery,
      }
    case STORE_WINERY_DETAILS:
      return { ...state,
        wineryDetails: action.payload.wineryDetails,
      }
    default:
      return state;
  }
}

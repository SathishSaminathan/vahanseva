import * as actionTypes from '../actions/actionTypes';
import {combineReducers} from 'redux';

const user_initalState = {
  current_user: null,
  isLoading: true,
  activeImage: null,
};
const FAB_initalState = {
  name: 'image',
};
const toggle_initialState = {
  modalVisible: false,
};

const user_reducer = (state = user_initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER:
      return {
        ...state,
        current_user: action.payload.current_user,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        current_user: null,
      };
    case actionTypes.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.status,
      };
    case actionTypes.ACTIVE_IMAGE:
      return {
        ...state,
        activeImage: action.image,
      };
    default:
      return state;
  }
};

const FAB_reducer = (state = FAB_initalState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_LOADING_FAB_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};

const toggle_reducer = (state = toggle_initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: action.status,
      };
    default:
      return state;
  }
};

const root_reducer = combineReducers({
  user: user_reducer,
  FAB_reducer: FAB_reducer,
  toggle_reducer,
});

export default root_reducer;

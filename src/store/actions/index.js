import {
  ADD_USER,
  REMOVE_USER,
  TOGGLE_LOADING,
  TOGGLE_LOADING_FAB_NAME,
  TOGGLE_MODAL,
  ACTIVE_IMAGE,
} from './actionTypes';

export const setUser = (user) => {
  return {
    type: ADD_USER,
    payload: {
      current_user: user,
    },
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const toggleLoading = (status) => {
  return {
    type: TOGGLE_LOADING,
    status,
  };
};

export const toggleModal = (status) => {
  return {
    type: TOGGLE_MODAL,
    status,
  };
};

export const toggleFabName = (name) => {
  return {
    type: TOGGLE_LOADING_FAB_NAME,
    name,
  };
};

export const activeImage = (image) => {
  return {
    type: ACTIVE_IMAGE,
    image,
  };
};

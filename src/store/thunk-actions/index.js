import { getWishlist, getProducts } from "../../services/APIHelpers";
import { setWishlist, setActiveList, toggleLoading } from "../actions";

export const getWishlistProducts = data => {
  return dispatch => {
    getWishlist(data).then(res => {
      dispatch(setWishlist(res.data.sm));
    });
  };
};

export const getProductsData = data => {
  return dispatch => {
    dispatch(toggleLoading(true));
    getProducts(data).then(res => {
      dispatch(setActiveList(res.data.sm));
      dispatch(toggleLoading(false));
    });
  };
};

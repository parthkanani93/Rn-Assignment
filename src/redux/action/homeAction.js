import {requestApi} from '../../api/apiService';
import {PRODUCT_ENDPOINT} from '../../api/constants';
import strings from '../../i18n/strings';
import {
  ADD_PRODUCT_API,
  DELETE_PRODUCT_API,
  GET_PRODUCTS_API,
  GET_PRODUCTS_API_LOADING,
  UPDATE_PRODUCT_API,
} from '../types';

// get product api action
export const getProductAction = () => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_API_LOADING, payload: true});
    requestApi('GET', PRODUCT_ENDPOINT)
      .then(response => dispatch({type: GET_PRODUCTS_API, payload: response}))
      .catch(error =>
        dispatch({type: GET_PRODUCTS_API_LOADING, payload: false}),
      );
  };
};

// delete product api action
export const deleteProductAction = productId => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_API_LOADING, payload: true});
    requestApi('DELETE', `${PRODUCT_ENDPOINT}/${productId}`)
      .then(response => {
        dispatch({type: DELETE_PRODUCT_API, payload: response});
        return getProductAction()(dispatch);
      })
      .catch(error =>
        dispatch({type: GET_PRODUCTS_API_LOADING, payload: false}),
      );
  };
};

// add product api action
export const addProductAction = (product, successFunction) => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_API_LOADING, payload: true});
    requestApi('POST', PRODUCT_ENDPOINT, product)
      .then(response => {
        dispatch({type: ADD_PRODUCT_API, payload: response});
        successFunction(strings.productAddedSuccessfully);
      })
      .catch(error => {
        dispatch({type: GET_PRODUCTS_API_LOADING, payload: false});
      });
  };
};

// update product api action
export const updateProductAction = (productId, product, successFunction) => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_API_LOADING, payload: true});
    requestApi('PUT', `${PRODUCT_ENDPOINT}/${productId}`, product)
      .then(response => {
        dispatch({type: UPDATE_PRODUCT_API, payload: response});
        successFunction(strings.productUpdatedSuccessfully);
      })
      .catch(error =>
        dispatch({type: GET_PRODUCTS_API_LOADING, payload: false}),
      );
  };
};

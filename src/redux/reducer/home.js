import {
  ADD_PRODUCT_API,
  DELETE_PRODUCT_API,
  GET_PRODUCTS_API,
  GET_PRODUCTS_API_LOADING,
  UPDATE_PRODUCT_API,
} from '../types';

const initialState = {
  products: [],
  addProduct: {},
  loader: false,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_API_LOADING:
      return {...state, loader: action.payload};
    case GET_PRODUCTS_API:
      return {
        ...state,
        products: action.payload,
        loader: false,
      };
    case DELETE_PRODUCT_API:
      return {
        ...state,
        loader: false,
      };
    case ADD_PRODUCT_API:
      return {
        ...state,
        addProduct: action.payload,
        loader: false,
      };
    case UPDATE_PRODUCT_API:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product,
        ),
        loader: false,
      };
    default:
      return state;
  }
}

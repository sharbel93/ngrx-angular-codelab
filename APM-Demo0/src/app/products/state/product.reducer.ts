import {Product} from '../product';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  shoeProduct: boolean;
  currentProduct: Product;
  products: Product[];
}

export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      // console.log('existing state: ' + JSON.stringify(state));
      // console.log('payload: ' + action.payload);
      return {
        ...state, showProductCode: action.payload
      };
    default:
      return state;
  }
}

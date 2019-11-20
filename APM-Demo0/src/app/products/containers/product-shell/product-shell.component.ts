import {Component, OnDestroy, OnInit} from '@angular/core';


import { Product } from '../../product';
import { ProductService } from '../../product.service';
// ngRx
import {select, Store} from '@ngrx/store';
import * as fromProduct from '../../state/product.reducer';
import * as productActions from '../../state/product.actions';
import {takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  errorMessage$: Observable<string>;
  displayCode$: Observable<boolean>;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  constructor(
    private store: Store<fromProduct.State>) { }

  // Do NOT subscribe here because it uses an async pipe
  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());

    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
    this.selectedProduct$ = this.store.pipe(select(fromProduct.getCurrentProduct));
    this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
  }


  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';


import { Product } from '../product';
import { ProductService } from '../product.service';
// ngRx
import {select, Store} from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import {takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  componentActive = true;
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  private products$: Observable<Product[]>;
  private errorMessage$: Observable<string>;


  constructor(
    private store: Store<fromProduct.State>,
    private productService: ProductService) { }

  ngOnInit(): void {

    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new productActions.Load());

    // Subscribe here because it does not use an async pipe
    this.store.pipe(select(fromProduct.getCurrentProduct),
      takeWhile(() => this.componentActive)).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: (err: any) => this.errorMessage = err.error
    // });

    // subscribing to the state changes from the ngrx store
    // Subscribe here because it does not use an async pipe
    this.store.pipe(select(fromProduct.getShowProductCode),
      takeWhile(() => this.componentActive)).subscribe(
      showProductCode => {
          this.displayCode = showProductCode;
      });
  }

  ngOnDestroy(): void {
   this.componentActive = false;
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

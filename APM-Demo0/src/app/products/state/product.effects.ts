import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ProductService} from '../product.service';
import * as productActions from './product.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Product} from '../product';
import {of} from 'rxjs';
@Injectable()
export class ProductEffects {
  //
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
  //
  @Effect()
  loacProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap((action: productActions.Load) =>
    this.productService.getProducts().pipe(
      map((products: Product[]) =>
        (new productActions.LoadSuccess(products))),
      catchError(err => of(new productActions.LoadFail(err)))
    ))
  );
}

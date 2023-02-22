import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';
import { CategoriesService } from '../services/categories.service';

@Injectable({
  providedIn: 'root'
})

export class CategoryResolver implements Resolve<Category> {

  constructor(private service: CategoriesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id'])
    }
    return of(new Category());
  }

}

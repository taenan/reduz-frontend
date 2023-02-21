import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, of, tap } from 'rxjs';
import { Icon } from 'src/app/shared/models/icons.model';

import { Category } from '../model/category';
import { CategoryPage } from '../model/category-page';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly API = '/api/categories';

  private cache: Category[] = [];

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<CategoryPage>(this.API).pipe(
      first(),
      map(data => data.content),
      tap(data => (this.cache = data))
    );
  }

  loadById(id: number) {
    if (this.cache.length > 0) {
      const record = this.cache.find(category => `${category.id}` === `${id}`);
      return record != null ? of(record) : this.getById(id);
    }
    return this.getById(id);
  }

  save(record: Partial<Category>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: string) {
    return this.http.delete<Category>(`${this.API}/${id}`).pipe(first());
  }

  loadIcons() {
    return this.http.get<Icon[]>('assets/icons.json').pipe(first());
  }

  private getById(id: number) {
    return this.http.get<Category>(`${this.API}/${id}`).pipe(first());
  }

  private update(record: Partial<Category>) {
    return this.http.put<Category>(`${this.API}/${record.id}`, record).pipe(first());
  }

  private create(record: Partial<Category>) {
    return this.http.post<Category>(this.API, record).pipe(first());
  }




}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, of, tap } from 'rxjs';

import { Link } from '../model/link';
import { LinkPage } from '../model/link-page';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  private readonly API = '/api/links';

  private cache: Link[] = [];

  constructor(private http: HttpClient) { }

  loadURL(url: string) {
    return this.http.get<Link>(`${this.API}/loadurl?url=${url}`).pipe(first());
  }
  
  list() {
    return this.http.get<LinkPage>(this.API).pipe(
      first(),
      map(data => data.content),
      tap(data => (this.cache = data))
    );
  }

  loadById(id: number) {
    if (this.cache.length > 0) {
      const record = this.cache.find(record => `${record.id}` === `${id}`);
      return record != null ? of(record) : this.getById(id);
    }
    return this.getById(id);
  }

  loadBySlug(slug: string) {
    if (this.cache.length > 0) {
      const record = this.cache.find(record => `${record.slug}` === `${slug}`);
      return record != null ? of(record) : this.getBySlug(slug);
    }
    return this.getBySlug(slug);
  }

  save(record: Partial<Link>) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: string) {
    return this.http.delete<Link>(`${this.API}/${id}`).pipe(first());
  }

  private update(record: Partial<Link>) {
    return this.http.put<Link>(`${this.API}/${record.id}`, record).pipe(first());
  }

  private create(record: Partial<Link>) {
    return this.http.post<Link>(this.API, record).pipe(first());
  }

  private getById(id: number) {
    return this.http.get<Link>(`${this.API}/${id}`).pipe(first());
  }

  private getBySlug(slug: string) {
    return this.http.get<Link>(`${this.API}/findbyslug?slug=${slug}`).pipe(first());
  }
  
}

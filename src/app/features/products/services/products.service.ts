import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable()
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly resourceUrl = `${environment.apiUrl}/items`;
  private readonly headers = { Authorization: 'Bearer 123' };

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.resourceUrl, {
      headers: this.headers,
    });
  }
}
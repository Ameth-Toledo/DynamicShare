import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Store {
  id: number;
  manager: string;
  address: string;
  phone: string;
  image: string;
  googleMapsUrl: string;
  shareUrl?: string;
}

export interface StoresData {
  stores: Store[];
}

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  constructor(private http: HttpClient) { }

  getStores(): Observable<StoresData> {
    return this.http.get<StoresData>('assets/data/stores.json');
  }

  getStoreById(id: number): Observable<Store | undefined> {
    return this.http.get<StoresData>('assets/data/stores.json').pipe(
      map(data => data.stores.find(store => store.id === id))
    );
  }
}
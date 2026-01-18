import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Store {
  id: number;
  manager: string;
  address: string;
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
}
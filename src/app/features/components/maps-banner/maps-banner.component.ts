import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopsService, Store } from '../../../core/services/shops.service';
import { SanitizeUrlPipe } from '../../../share/pipes/sanitize-url.pipe';

@Component({
  selector: 'app-maps-banner',
  standalone: true,
  imports: [CommonModule, FormsModule, SanitizeUrlPipe],
  templateUrl: './maps-banner.component.html',
  styleUrl: './maps-banner.component.css'
})
export class MapsBannerComponent implements OnInit {
  @ViewChild('storeInfo') storeInfo!: ElementRef;
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  stores: Store[] = [];
  selectedStore: Store | null = null;
  searchTerm: string = '';
  filteredStores: Store[] = [];

  constructor(private shopsService: ShopsService) {}

  ngOnInit() {
    this.shopsService.getStores().subscribe(data => {
      this.stores = data.stores;
      this.selectedStore = this.stores.find(store => store.id === 1) || this.stores[0];
    });
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredStores = [];
      this.selectedStore = this.stores.find(store => store.id === 1) || this.stores[0];
      return;
    }

    const term = this.searchTerm.trim().toLowerCase();
    
    const exactIdMatch = this.stores.find(store => store.id.toString() === term);
    if (exactIdMatch) {
      this.filteredStores = [exactIdMatch];
      this.selectedStore = exactIdMatch;
      return;
    }

    this.filteredStores = this.stores.filter(store =>
      store.manager.toLowerCase().includes(term) ||
      store.address.toLowerCase().includes(term)
    );

    if (this.filteredStores.length > 0) {
      this.selectedStore = this.filteredStores[0];
    }
  }

  getMapUrl(): string {
    if (this.selectedStore?.googleMapsUrl) {
      return this.selectedStore.googleMapsUrl;
    }
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.632215042093!2d-99.133208!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff6a3f4b3f3f%3A0x5f0a8b8c7d7b2c6!2aCiudad%20de%20México!5e0!3m2!1ses!2smx!4v1700000000000';
  }
}
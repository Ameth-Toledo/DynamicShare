import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../share/components/header/header.component";
import { CardShopComponent } from "../../components/card-shop/card-shop.component";
import { ShopsService, Store } from '../../../core/services/shops.service';

@Component({
  selector: 'app-shops',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardShopComponent],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css'
})
export class ShopsComponent implements OnInit {
  stores: Store[] = [];

  constructor(private shopsService: ShopsService) {}

  ngOnInit(): void {
    this.shopsService.getStores().subscribe({
      next: (data) => {
        this.stores = data.stores;
      },
      error: (error) => {
        console.error('Error al cargar las tiendas:', error);
      }
    });
  }
}
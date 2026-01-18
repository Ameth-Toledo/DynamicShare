import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-shop',
  standalone: true,
  imports: [],
  templateUrl: './card-shop.component.html',
  styleUrl: './card-shop.component.css'
})
export class CardShopComponent {
  @Input() imageSrc: string = '';
  @Input() manager: string = '';
  @Input() address: string = '';
  @Input() id: number = 0;

  constructor (private router: Router) {}

  sendToDetail() {
    const managerSlug = this.manager.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['shop/dynamicshare', managerSlug, this.id]);
  }
}
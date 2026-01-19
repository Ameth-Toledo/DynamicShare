import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopsService, Store } from '../../../core/services/shops.service';
import { SanitizeUrlPipe } from '../../../share/pipes/sanitize-url.pipe';
import { HeaderComponent } from '../../../share/components/header/header.component';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, SanitizeUrlPipe, HeaderComponent],
  templateUrl: './shop-detail.component.html',
  styleUrl: './shop-detail.component.css'
})
export class ShopDetailComponent implements OnInit {
  store: Store | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shopsService: ShopsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.shopsService.getStoreById(Number(id)).subscribe({
        next: (data) => {
          this.store = data || null;
          this.loading = false;
          
          if (!this.store) {
            this.router.navigate(['/shops']);
          }
        },
        error: (error) => {
          console.error('Error al cargar la tienda:', error);
          this.loading = false;
          this.router.navigate(['/shops']);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/shops']);
  }

  openGoogleMaps(): void {
    if (this.store?.googleMapsUrl) {
      window.open(this.store.googleMapsUrl, '_blank');
    }
  }

  shareStore(): void {
    if (this.store?.shareUrl) {
      if (navigator.share) {
        navigator.share({
          title: this.store.manager,
          text: `Visita ${this.store.manager} en DynamicShare`,
          url: this.store.shareUrl
        }).catch(err => console.log('Error al compartir:', err));
      } else {
        navigator.clipboard.writeText(this.store.shareUrl);
        alert('Enlace copiado al portapapeles');
      }
    }
  }

  copyPhone(): void {
    if (this.store?.phone) {
      navigator.clipboard.writeText(this.store.phone).then(() => {
        alert('Teléfono copiado al portapapeles');
      }).catch(err => {
        console.error('Error al copiar:', err);
      });
    }
  }
}
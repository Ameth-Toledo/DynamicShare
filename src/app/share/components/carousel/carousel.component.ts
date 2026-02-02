import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  autoplayInterval: any;
  showShareMenu = false;

  slides = [
    'assets/carousel/banner1.png',
    'assets/carousel/banner2.png',
    'assets/carousel/banner3.png'
  ];

  shareImage = 'assets/carousel/banner2.png';
  shareUrl = 'https://dynamic-share.vercel.app/';

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoplay();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetAutoplay();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetAutoplay();
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  resetAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  toggleShareMenu(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.showShareMenu = !this.showShareMenu;
  }

  async shareOn(platform: string, event: Event): Promise<void> {
    event.stopPropagation();
    event.preventDefault();
    
    const shareText = 'Gana dinero viendo videos y ayuda a las empresas como tiktok, facebook y youtube';
    const fullImageUrl = `${window.location.origin}/assets/carousel/banner2.png`;

    let url = '';

    switch(platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.shareUrl)}`;
        break;
      
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + this.shareUrl)}`;
        break;
      
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(this.shareUrl)}`;
        break;
      
      case 'instagram':
        if (navigator.share) {
          try {
            const response = await fetch(this.shareImage);
            const blob = await response.blob();
            const file = new File([blob], 'banner2.png', { type: 'image/png' });
            
            await navigator.share({
              title: 'Gana dinero viendo videos',
              text: shareText,
              url: this.shareUrl,
              files: [file]
            });
            this.showShareMenu = false;
            return;
          } catch (error) {
            console.log('Error compartiendo:', error);
          }
        }
        
        alert('Para compartir en Instagram:\n\n1. Descarga la imagen usando el botón "Descargar imagen"\n2. Abre Instagram\n3. Crea una nueva publicación\n4. Sube la imagen descargada\n5. Usa este texto en la descripción:\n\n' + shareText + '\n\n' + this.shareUrl);
        this.showShareMenu = false;
        return;
      
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(this.shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }

    this.showShareMenu = false;
  }

  downloadCurrentImage(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    
    const link = document.createElement('a');
    link.href = this.shareImage;
    link.download = 'banner2.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showShareMenu = false;
  }

  async copyShareText(event: Event): Promise<void> {
    event.stopPropagation();
    event.preventDefault();
    
    const shareText = 'Gana dinero viendo videos y ayuda a las empresas como tiktok, facebook y youtube';
    const fullText = `${shareText}\n\n${this.shareUrl}`;
    
    try {
      await navigator.clipboard.writeText(fullText);
      alert('¡Texto copiado al portapapeles! 📋\n\nAhora puedes pegarlo en cualquier lugar.');
      this.showShareMenu = false;
    } catch (error) {
      console.error('Error al copiar:', error);
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('¡Texto copiado al portapapeles! 📋');
      } catch (err) {
        alert('No se pudo copiar automáticamente. Por favor, copia este texto:\n\n' + fullText);
      }
      document.body.removeChild(textArea);
      this.showShareMenu = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.share-menu-container')) {
      this.showShareMenu = false;
    }
  }
}
import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, ArrowRight } from 'lucide-angular';
import { gsap } from 'gsap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements AfterViewInit {
  readonly ArrowRight = ArrowRight;

  constructor(  
    @Inject(PLATFORM_ID) 
    private platformId: Object,
    private router: Router) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initAnimations();
      }, 100);
    }
  }

  private initAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.banner-title',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );

    tl.fromTo('.banner-button',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    );

    tl.fromTo('.banner-image',
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      '-=0.8'
    );
  }

  sendToShops(event: Event) {
    event.preventDefault();
    this.router.navigate(['shops']);
  }
}
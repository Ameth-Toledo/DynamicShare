import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../share/components/header/header.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { MapsBannerComponent } from "../../components/maps-banner/maps-banner.component";
import { FooterComponent } from "../../../share/components/footer/footer.component";
import { VideoLayoutComponent } from "../../../share/components/video-layout/video-layout.component";
import { CarouselComponent } from "../../../share/components/carousel/carousel.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    BannerComponent,
    MapsBannerComponent,
    FooterComponent,
    VideoLayoutComponent,
    CarouselComponent
],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  showModal = false;

  ngOnInit() {
    // Mostrar el modal automáticamente cuando se carga el componente
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
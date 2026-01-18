import { Component } from '@angular/core';
import { HeaderComponent } from "../../../share/components/header/header.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { BannerComponent } from "../../components/banner/banner.component";
import { MapsBannerComponent } from "../../components/maps-banner/maps-banner.component";
import { FooterComponent } from "../../../share/components/footer/footer.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, BannerComponent, MapsBannerComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}

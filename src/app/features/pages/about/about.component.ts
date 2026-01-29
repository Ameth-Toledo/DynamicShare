import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../share/components/header/header.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  selectedCertificate: string | null = null;

  openCertificate(certificateUrl: string): void {
    this.selectedCertificate = certificateUrl;
    document.body.style.overflow = 'hidden';
  }

  closeCertificate(): void {
    this.selectedCertificate = null;
    document.body.style.overflow = 'auto';
  }
}
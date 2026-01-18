import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isMenuOpen = false;

  readonly Menu = Menu;
  readonly X = X;

  constructor (private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  sendToHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['']);
  }

  sendToShops(event: Event) {
    event.preventDefault();
    this.router.navigate(['shops']);
  }

  sendToAbout(event: Event) {
    event.preventDefault();
    this.router.navigate(['']);
  }
}

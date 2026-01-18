import { Routes } from '@angular/router';
import { LandingComponent } from './features/pages/landing/landing.component';
import { ShopsComponent } from './features/pages/shops/shops.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '', component: LandingComponent },
    { path: 'shops', component: ShopsComponent }
];

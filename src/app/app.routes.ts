import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { NosOffresComponent } from './pages/nos-offres/nos-offres';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'nos-offres', component: NosOffresComponent },
  { path: '**', redirectTo: '' }
];

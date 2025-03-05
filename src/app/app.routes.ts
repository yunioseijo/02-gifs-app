import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard/dashboard-page.component'),
  },
  {
    path: 'trending',
    loadComponent: () => import('./gifs/pages/trending-page/trending-page.component').then(m => m.TrendingPageComponent),
  },
  {
    path: 'search',
    loadComponent: () => import('./gifs/pages/search-page/search-page.component').then(m => m.SearchPageComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];

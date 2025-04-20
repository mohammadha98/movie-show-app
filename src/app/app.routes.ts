import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "", loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: "browse", loadComponent: () => import('./pages/browse/browse.component')
    },
    {
        path: "movie/:id", loadComponent: () => import('./pages/movie-detail/movie-detail.component')
    },
];

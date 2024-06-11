import { Routes } from '@angular/router';

import { SigninComponent } from './auth/signin.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'signin', pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'signup',
        loadComponent: () => import('./auth/signup.component').then(c => c.SignupComponent)
    },
    {
        path: 'todos',
        loadChildren: () => import('./todos/todos.routes').then(r => r.todos_routes)
    }

];


import { Router, Routes } from '@angular/router';

import { SigninComponent } from './auth/signin.component';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';

const signin_Guard = () => {
    const router = inject(Router);
    const signed_In = inject(AuthService).is_logged_in();
    if (signed_In) {
        router.navigate(['', 'todos', 'list']);
        return false;
    } else {
        return true;
    }
};
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'signin', pathMatch: 'full'
    },

    {
        path: 'signin',
        component: SigninComponent,
        // canActivate: [() => !inject(AuthService).is_logged_in()]
        canActivate: [signin_Guard] // details guard
    },
    {
        path: 'signup',
        loadComponent: () => import('./auth/signup.component').then(c => c.SignupComponent),
        canActivate: [() => !inject(AuthService).is_logged_in()]
    },
    {
        path: 'todos',
        loadChildren: () => import('./todos/todos.routes').then(r => r.todos_routes),
        canActivate: [() => inject(AuthService).is_logged_in()]
    },
    {
        path: '**',
        redirectTo: ''
    },

];


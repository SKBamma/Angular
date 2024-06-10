import { Routes } from '@angular/router';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';

export const routes: Routes = [
    { path: '', component: SignupComponent },
    { path: '**', redirectTo: 'signup' },
    {
        path: 'signin', loadComponent: () =>
            import('./auth/signin.component').then(c => c.SigninComponent)
    },
    {
        path: 'signup', loadComponent: () =>
            import('./auth/signup.component').then(c => c.SignupComponent)
    }

];

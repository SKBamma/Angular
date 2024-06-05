import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'users', component: UsersComponent },
    { path: 'user/:user_id', component: UserComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '' }
];
